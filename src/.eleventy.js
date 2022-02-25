var nunjucks = require('nunjucks');

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksFilter('interpolate', function(str) {
    return nunjucks.renderString(str,this.ctx)
  })
  eleventyConfig.addFilter("dropContentFolder", function (path) {
    if (path.endsWith("/index")) {
        path = path.substring(0, -6);
    }
    const pathToDrop = "/pages"
    if (path.indexOf(pathToDrop) !== 0) {
        return path
    }
    return path.slice(pathToDrop.length)
})
  return {
    dir: {
      output: "dist",
    },
  };
};
