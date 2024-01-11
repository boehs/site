// Don't look at this file!
// It's a dirty secret!
// No modularity :(

const EleventyFetch = require("@11ty/eleventy-fetch");

class Analytics {
	data() {
		return {
			// Writes to "/my-permalink/index.html"
			permalink: "colophon.js"
		};
	}

	async render({config}) {
		try {
			let url = config.analytics.script;

			const content = await EleventyFetch(url, {
				duration: "1d",
				type: "text"
			});

			return content
				.replace(/.\(.\+"website-id"\)/,`"${config.analytics.id}"`)
				.replace(/.=.\(.\+"host-url"\),/,'')
                .replace(/.\(.\+"domains"\)\|\|/,'')
                .replace(/"false"!==.\(.\+"auto-track"\)/, "true")
                .replace(/.\(.\+"do-not-track"\)/, "false")
				.replace(/\(.\?.\.replace\(\/\\\/\$\/,""\):.\.src\.split\("\/"\)\.slice\(0,-1\)\.join\("\/"\)\)\+"(.*?)"/, `"${config.analytics.base}$1"`)
                // now h isn't needed
                .replace(/.=.\.getAttribute\.bind\(.\),/, "")
                // also d = u.currentScript; is not needed but it's too annoying to remove
		} catch (e) {
			return {
				// my failure fallback data
			}
		}
	};
}

module.exports = Analytics;
