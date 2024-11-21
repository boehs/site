import { svg } from "../utils/ogHelpers.js";
import { Resvg } from "@resvg/resvg-js";

export default class Og {
    data() {
        return {
            pagination: {
                size: 1,
                data: "collections.ogReady",
                alias: "entry",
            },
            eleventyExcludeFromCollections: true,
            mdTemplateEngine: false,
            htmlTemplateEngine: false,
            eleventyComputed: {
                permalink: (ctx) => {
                    return (
                        "og" +
                        ctx.entry.outputPath
                            .replace(".html", ".png")
                            .replace("./out", "")
                    );
                },
            },
        };
    }
    async render(page) {
        let svgd = await svg({
            title: page.entry.data.title,
            desc: page.entry.data.description,
            date: page.entry.data.date?.toLocaleDateString(),
            color: page.entry.data.color,
        });
        /**
         * @type {import("@resvg/resvg-js").ResvgRenderOptions}
         */
        const options = {
            font: {
                loadSystemFonts: false,
            },
        };
        const png = new Resvg(svgd, options).render().asPng();
        return png;
    }
}
