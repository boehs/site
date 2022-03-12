const nunjucks = require("nunjucks");
const sanitize = require("sanitize-filename");

const collectionControl = require('./_data/collectionsControl.json')

function markdownIt() {
  let markdownIt = require("markdown-it");
  let options = {
    html: true,
    breaks: true,
    typographer: true,
    linkify: true,
  };
  return (
    new markdownIt(options)
      //.use(require("markdown-it-obsidian")({baseURL: '/pages/c/'}))
      .use(require("markdown-it-table-of-contents"), { includeLevel: [2, 3] })
      .use(require("markdown-it-anchor"))
      .use(require("markdown-it-attrs"))
      .use(
        require("@gardeners/markdown-it-wikilinks")({
          postProcessPageName: (pageName) => {
            pageName = pageName.trim();
            pageName = pageName.split("/").map(sanitize).join("/");
            return pageName;
          },
          includeWikilinks: 'outer'
        })
      )
  );
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"))
  
  eleventyConfig.addNunjucksFilter("interpolate", function(str) {
    return nunjucks.renderString(str, this.ctx)
  });
  eleventyConfig.addFilter("dropContentFolder", (path) =>
    path.replace(/pages\//, "")
  );
  
  eleventyConfig.setLibrary("md", markdownIt());
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: (file, options) =>
      (file.excerpt = file.content.split("\n").slice(0, 4).join(" ")),
  });
  
  eleventyConfig.addPassthroughCopy('favicon.ico')
  eleventyConfig.addPassthroughCopy({'_assets/*':"."})
  eleventyConfig.addPassthroughCopy({'pages/c/Assets/*': "assets"})
  
  // I'm so sorry to developers everywhere
  // 11ty has little consept of order of operations, but one way to make
  // a page get built later in the cascade is to make it reference a collection
  // because collections by nature need the details of all pages
  // we need the data object, and the only way to get it is via a collection item
  // this is referenced in four.njk
  
  // thank god this does not work
  eleventyConfig.addCollection('wtf',function(collectionApi){
    //console.log(collectionApi.getAll()[0].data.internal)
    return collectionApi.getAll()[collectionApi.getAll().length - 1].data.internal.four
  })
  
  eleventyConfig.addNunjucksGlobal('getContext', function() { 
    return this.ctx;
  })
  
  eleventyConfig.addFilter('getType', function(thing) {
      return ({}).toString.call(thing).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
  })
  
  eleventyConfig.addFilter('random', function(array) {
    return array[Math.floor(Math.random() * array.length)]
  })
  
  eleventyConfig.addCollection('taxes',function(collectionApi) {
    // lets make a variable to hold our taxonomies and values
    let taxAndValues = [] 
    // We need to get each post in our posts folder. In my case this is /c
    const nodes = collectionApi.getFilteredByGlob('pages/c/*.md')
    // next lets iterate over all the nodes
    nodes.forEach(node => {
      // and then iterate over the taxonomies
      for (const [_,value] of Object.entries(collectionControl)) {
        const taxonomy = value.frontmatter
        // I don't want to paginate date, for instance
        // this is why my collectionControl is using objects instead of arrays
        if (value.excludeFromPagination) continue
        else if (node?.data?.[taxonomy]) {
          // this is typeof on drugs
          switch(({}).toString.call(node.data[taxonomy]).match(/\s([a-zA-Z]+)/)[1].toLowerCase()) {
            // if it is an array (for tags especially)
            case 'array':
              node.data[taxonomy].forEach(item => {
                taxAndValues.push([taxonomy,item])
              })
              break
            // otherwise
            default: taxAndValues.push([taxonomy,node.data[taxonomy]])
          }
        }
      }
    });
    
    // custom set, sets don't work with objects
    const unique = [...new Set(taxAndValues.map(JSON.stringify))].map(JSON.parse)
    
    return unique
})
  
  return {
    dir: {
      output: "dist",
    },
  };
};
