const nunjucks = require("nunjucks");
const sanitize = require("sanitize-filename");
const slugify = require('../shared/slugify')

const collectionControl = require("./_data/collectionsControl.json");

function markdownIt() {
  let options = {
    html: false,
    breaks: true,
    typographer: true,
    linkify: true,
  };
  let markdownIt = require("markdown-it")(options);
  
  return (
    markdownIt
      .use(require("markdown-it-anchor"))
      .use(
        require("@gardeners/markdown-it-wikilinks")({
          postProcessPageName: (pageName) => {
            pageName = pageName.trim();
            pageName = pageName.split("/").map(sanitize).join("/");
            pageName = slugify(pageName)
            return pageName;
          },
          imagePattern: /!\[\[([^]+?)\]\]/,
          assetPrefix: '/assets/',
          uriSuffix: '.gmi'
        })
      )
  );
}

module.exports = function (eleventyConfig) {
  const markdown = markdownIt()
  
  eleventyConfig.addNunjucksFilter("interpolate", function (str) {
    return nunjucks.renderString(str, this.ctx);
  });
  eleventyConfig.addFilter("dropContentFolder", (path,folder) =>
    path.replace(new RegExp(folder + "\/"), "")
  );
  eleventyConfig.addFilter('slugshive',(path) => 
    slugify(path)
  )
  eleventyConfig.addFilter("renderMd", content => markdown.render(content))

  eleventyConfig.setLibrary("md", markdown);
  
  eleventyConfig.addExtension("md", {
    compile: function (inputContent, inputPath) {
      return async function (data) {
        // How ugly? ME YESSS!
        const dioscuri = await import('dioscuri')
        const fromParse5 = await import('hast-util-from-parse5')
        const toMdast = await import('hast-util-to-mdast')
        const parse5 = require('parse5')
        
        const md = await this.defaultRenderer(data)
        
        if(md.match(/<(p|(li)|a|(h[1-6]))/)) {
          return dioscuri.toGemtext(dioscuri.fromMdast(toMdast.toMdast(fromParse5.fromParse5(parse5.parseFragment(md)))))
        } else return md
        
      }
    },
    outputFileExtension: 'gmi'
  })
  
  const nunjucksEnvironment = new nunjucks.Environment(
    // Specify the directories where your templates reside.
    new nunjucks.FileSystemLoader(["./", "_includes"]),

    // Apply rendering options
    { 
      lstripBlocks: true,
      trimBlocks: true,
      autoescape: false
    }
  );
  
  eleventyConfig.setLibrary("njk", nunjucksEnvironment);
  
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: (file) =>
      (file.excerpt = file.content.split("\n").slice(0, 4).join(" ")),
  });

  // I won't even attempt to explain this
  eleventyConfig.addCollection("wtf", function (collectionApi) {
    // ok I lied
    // acess the first post that can get the information we need
    const firstPost = collectionApi.getFilteredByGlob("pages/garden/node/*.md")[0].data
    // and then pass it to itself to emulate computed
    const links = firstPost.eleventyComputed.brokenLinks(firstPost,true)
    // return as array for pagination
    return Array.from(links)
  });
  

  eleventyConfig.addNunjucksGlobal("getContext", function () {
    return this.ctx;
  });
  
  eleventyConfig.addNunjucksGlobal("getEnv", function (k,v) {
    return process.env[k] == v
  });

  eleventyConfig.addFilter("getType", function (thing) {
    return {}.toString
      .call(thing)
      .match(/\s([a-zA-Z]+)/)[1]
      .toLowerCase();
  });

  eleventyConfig.addFilter("random", function (array) {
    return array[Math.floor(Math.random() * array.length)];
  });
  
  eleventyConfig.addCollection("redirects", function (collectionApi) {
    // lets make a variable to hold our redirects
    let redirects = [];
    // We need to get each post in our posts folder. In my case this is /node
    const nodes = collectionApi.getFilteredByGlob("pages/garden/node/*.md");
    // next lets iterate over all the nodes
    nodes.forEach(node =>
      // for each alias 
      (node.data.aliases || []).forEach(alias =>
        // push the target url and the old url
        redirects.push([node.data.page.url,node.data.page.url.replace(/\/[^\/]*?(\..+)?$/, `/${alias}$1`)])
      )
    )
    return redirects
  })

  eleventyConfig.addCollection("taxes", function (collectionApi) {
    // lets make a variable to hold our taxonomies and values
    let taxAndValues = [];
    // We need to get each post in our posts folder. In my case this is /node
    const nodes = collectionApi.getFilteredByGlob("pages/garden/node/*.md");
    // next lets iterate over all the nodes
    nodes.forEach((node) => {
      // and then iterate over the taxonomies
      for (const [taxonomy, value] of Object.entries(collectionControl)) {
        // I don't want to paginate date, for instance
        // this is why my collectionControl is using objects instead of arrays
        if (value.excludeFromPagination) continue;
        else if (node?.data?.[taxonomy]) {
          // this is typeof on drugs
          switch (
            {}.toString
              .call(node.data[taxonomy])
              .match(/\s([a-zA-Z]+)/)[1]
              .toLowerCase()
          ) {
            // if it is an array (for tags especially)
            case "array":
              node.data[taxonomy].forEach((item) => {
                taxAndValues.push([taxonomy, item]);
              });
              break;
            // otherwise
            default:
              taxAndValues.push([taxonomy, node.data[taxonomy]]);
          }
        }
      }
    });

    // custom set, sets don't work with objects
    const unique = [...new Set(taxAndValues.map(JSON.stringify))].map(
      JSON.parse
    );

    return unique;
  });

  eleventyConfig.addCollection("nestedTax", function (collectionApi) {
    let nestedTax = {};
    const nodes = collectionApi.getFilteredByGlob("pages/garden/node/*.md");
    nodes.forEach((node) => {
      for (const [taxonomy, value] of Object.entries(collectionControl)) {
        const taxValue = node.data[taxonomy]

        if (value.excludeFromPagination) continue;
        else if (node?.data?.[taxonomy]) {
          if (!nestedTax[taxonomy]) nestedTax[taxonomy] = {};
          switch (
            {}.toString
              .call(taxValue)
              .match(/\s([a-zA-Z]+)/)[1]
              .toLowerCase()
          ) {
            case "array": {
              taxValue.forEach((item) => {
                // if the value in the object does not yet exist
                if (!nestedTax[taxonomy][item]) nestedTax[taxonomy][item] = [];
                // then add the entire page to it
                nestedTax[taxonomy][item].push(node);
              });
              break;
            }
            // otherwise
            default: {
              // if the value in the object does not yet exist
              if (!nestedTax[taxonomy][taxValue])
                nestedTax[taxonomy][taxValue] = [];
              // then add the entire page to it
              nestedTax[taxonomy][taxValue].push(node);
            }
          }
        }
      }
    });

    return nestedTax;
  });

  return {
    dir: {
      output: "dist",
    },
  };
};
