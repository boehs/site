module.exports = {
  title(data) {
    if (data.title) return data.title;
    return data.page.fileSlug.replace("-", " ");
  },
  color(data) {
    if (data.tags) {
      for (tag of data.tags) {
        if (!data.tagList[tag]) continue;
        if (data.tagList[tag].color) return data.tagList[tag].color;
        else continue;
      }
    }
    return data.config.color
  }
};
