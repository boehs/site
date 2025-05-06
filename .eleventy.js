import { minify } from "html-minifier";

// the files we want to use for our collections
const gardenStr = "./src/pages/garden/node/**/*.{md,csv}";

import scss from "./conf/templating/scss.js";
import { markdownTemplate } from "./conf/templating/markdown/index.js";
import csv from "./conf/templating/csv.js";

import {
	embedMastodon,
	embedBluesky,
} from "./conf/components/social/social.js";
import javascript from "./conf/templating/javascript.js";
import filters from "./conf/filters.js";

Error.stackTraceLimit = 100;

export default function (site) {
	const markdown = markdownTemplate(eleventyConfig);

	filters(eleventyConfig);

	eleventyConfig.addAsyncShortcode("embedMastodon", embedMastodon);
	eleventyConfig.addAsyncShortcode("embedBluesky", embedBluesky);

	eleventyConfig.addFilter("renderMd", (content) =>
		content ? markdown.render(content) : "",
	);

	eleventyConfig.setFrontMatterParsingOptions({
		// @ts-ignore
		excerpt: (file, options) =>
			(file.excerpt = file.content.split("\n").slice(0, 4).join(" ")),
	});

	eleventyConfig.addPassthroughCopy({ "./src/_public/": "." });
	eleventyConfig.addPassthroughCopy({
		"./src/pages/garden/node/Assets/*": "assets",
	});

	site.process([".html"], function (pages) {
		for (const page of pages) {
			if (
				this.page.outputPath &&
				this.page.outputPath.endsWith(".html") &&
				process.env.ELEVENTY_ENV == "production"
			) {
				page.content = minify(page.content, {
					useShortDoctype: true,
					removeComments: true,
					collapseWhitespace: true,
				});
			}
		}
	});

	// I won't even attempt to explain this
	eleventyConfig.addCollection("wtf", function (collectionApi) {
		// ok I lied
		// acess the first post that can get the information we need
		const firstPost = collectionApi.getFilteredByGlob(gardenStr)[0].data;
		// and then pass it to itself to emulate computed
		const links = firstPost.eleventyComputed.brokenLinks(firstPost, true);
		// return as array for pagination
		return Array.from(links);
	});

	eleventyConfig.addCollection("ogReady", function (collectionApi) {
		return collectionApi
			.getFilteredByGlob("./src/pages/**/*.*")
			.filter(function (item) {
				return (
					item.outputPath.endsWith("html") &&
					item.page.inputPath.endsWith(".md") &&
					item.data.title != "missing"
				);
			});
	});

	javascript(eleventyConfig);
	scss(eleventyConfig);
	csv(eleventyConfig, markdown);

	return {
		dir: {
			input: "src",
			output: "out",
		},
	};
}
