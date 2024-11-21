// Don't look at this file!
// It's a dirty secret!
// No modularity :(

import EleventyFetch from "@11ty/eleventy-fetch";
import { minify } from "terser";

export default class Analytics {
    data() {
        return {
            // Writes to "/my-permalink/index.html"
            permalink:
                process.env.ELEVENTY_ENV === "production"
                    ? "colophon.js"
                    : false,
        };
    }

    async render({ config }) {
        let url = config.analytics.script;

        if (process.env.ELEVENTY_ENV !== "production" || !url) {
            return "";
        }
        try {
            const content = await EleventyFetch(url, {
                duration: "1d",
                type: "text",
            });

            let script = content
                .replace(/.\(.\+"website-id"\)/, `"${config.analytics.id}"`)
                .replace(/.=.\(.\+"host-url"\),/, "")
                .replace(/.\(.\+"domains"\)\|\|/, "")
                .replace(/"false"!==.\(.\+"auto-track"\)/, "true")
                .replace(
                    /`\${.\?.\.replace\(\/\\\/\$\/.*?}(.*?)`/,
                    `"${config.analytics.base}$1"`,
                )
                // now h isn't needed
                .replace(/.=.\.getAttribute\.bind\(.\),/, "");
            // also d = u.currentScript; is not needed but it's too annoying to remove
            return (await minify(script)).code;
        } catch (e) {
            return {
                // my failure fallback data
            };
        }
    }
}
