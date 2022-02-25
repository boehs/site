var nunjucks = require('nunjucks');

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksFilter('interpolate', function(str) {
    return nunjucks.renderString(str,this.ctx)
  })
  return {
    dir: {
      output: "dist",
    },
  };
};
