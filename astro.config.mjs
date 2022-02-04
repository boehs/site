// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check

// import htmlPurge from 'vite-plugin-html-purgecss'
import { createHtmlPlugin } from 'vite-plugin-html'
import compileTime from "vite-plugin-compile-time"

export default /** @type {import('astro').AstroUserConfig} */ ({
	// Comment out "renderers: []" to enable Astro's default component support.
	buildOptions: {
		site: "https://boehs.org",
		pageUrlFormat: 'file'
	},
	vite: {
		plugins: [
			createHtmlPlugin(),
			compileTime()
		]
	},
});
