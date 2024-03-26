// Don't look at this file!
// It's a dirty secret!
// No modularity :(

const EleventyFetch = require("@11ty/eleventy-fetch");
const terser = require("terser");

class Analytics {
    data() {
        return {
            // Writes to "/my-permalink/index.html"
            permalink: "colophon.js",
        };
    }

    async render({ config }) {
        try {
            let url = config.analytics.script;

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
            return (await terser.minify(script)).code;
        } catch (e) {
            return {
                // my failure fallback data
            };
        }
    }
}

module.exports = Analytics;
