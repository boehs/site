import slugify from "../../utils/slugify.js";

export default {
    layout: "base.vto",
    permalink: (data) => {
        return (
            slugify(data.page.filePathStem.replace("/pages/", "/")) + ".html"
        );
    },
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
