module.exports = {
    title(data) {
        if (data.title) return data.title
        return data.page.fileSlug.replace('-',' ')
    }
}