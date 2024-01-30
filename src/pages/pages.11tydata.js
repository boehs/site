export default {
    layout: "base.njk",
    permalink:
        '{{ page.filePathStem | dropContentFolder: "pages" | slugshive}}.html',
    eleventyComputed: {
        metaTags: (data) => {
            return {
                "og:image": "/og" + data.page.url.replace("html", "png"),
                "twitter:card": "summary_large_image",
                ...data.metaTags,
            };
        },
    },
};
