export default {
    layout: "base.njk",
    permalink:
        '{{ page.filePathStem | dropContentFolder: "pages" | slugshive}}.html',
    eleventyComputed: {
        metaTags: (data) => {
            return {
                "og:image": `https://v1.opengraph.11ty.dev/${encodeURIComponent(
                    "https://boehs.org" + data.page.url,
                )}`,
            };
        },
    },
};
