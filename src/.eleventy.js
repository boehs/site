const nunjucks = require("nunjucks");
const sanitize = require("sanitize-filename");

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
  
  
  eleventyConfig.addFilter('random', function(array) {
    return array[Math.floor(Math.random * array.length)]
  })
  
  return {
    dir: {
      output: "dist",
    },
  };
};
