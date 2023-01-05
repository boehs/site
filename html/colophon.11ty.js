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
				.replace('w=y(g+"website-id")',`w="${config.analytics.id}"`)
				.replace('S=y(g+"host-url"),','')
				.split('(S?S.replace(/\\/$/,""):d.src.split("/").slice(0,-1).join("/"))+"').join('"' + config.analytics.base)
		} catch (e) {
			return {
				// my failure fallback data
			}
		}
	};
}

module.exports = Analytics;