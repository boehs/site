module.exports = {
  title(data) {
    if (data.title) return data.title;
    return data.page.fileSlug.replace("-", " ");
  },
  color(data) {
    for (const [collection] of Object.entries(data.collectionsControl)) {
      const frontmatter = data[collection];
      if (
        frontmatter &&
        data.tagList[collection]?.hasOwnProperty(frontmatter)
      ) {
        const item = data.tagList[collection][frontmatter];
        if (item.color) return item.color;
      }
    }
    return data.config.color;
  },
};
