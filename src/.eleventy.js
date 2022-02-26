var nunjucks = require('nunjucks');

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksFilter('interpolate', function(str) {
    return nunjucks.renderString(str,this.ctx)
  })
  eleventyConfig.addFilter("dropContentFolder", (path) => path.replace(/pages\//,''))
  return {
    dir: {
      output: "dist",
    },
  };
};
