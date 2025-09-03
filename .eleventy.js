import { minify } from "html-minifier";

// the files we want to use for our collections
const gardenStr = "./src/pages/garden/node/**/*.{md,csv}";

import slugify from "./utils/slugify.js";

import scss from "./conf/templating/scss.js";
import { markdownTemplate } from "./conf/templating/markdown/index.js";
import csv from "./conf/templating/csv.js";
import vento from "./conf/templating/vento.js";

import {
	embedMastodon,
	embedBluesky,
} from "./conf/components/social/social.js";
import javascript from "./conf/templating/javascript.js";
import filters from "./conf/filters.js";
import { taxes } from "./conf/collections/taxes.js";

Error.stackTraceLimit = 100;

/** @param {import("@11ty/eleventy/UserConfig").default} eleventyConfig */
export default function (eleventyConfig) {
	eleventyConfig.addPlugin(vento);

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

	eleventyConfig.addTransform("html", function (content) {
		if (
			this.page.outputPath &&
			this.page.outputPath.endsWith(".html") &&
			process.env.ELEVENTY_ENV == "production"
		) {
			return minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
		}
		return content;
	});

	// I won't even attempt to explain this
	eleventyConfig.addCollection("wtf", (collectionApi) => {
		// ok I lied
		// acess the first post that can get the information we need
		const firstPost = collectionApi.getFilteredByGlob(gardenStr)[0].data;
		// and then pass it to itself to emulate computed
		const links = firstPost.eleventyComputed.brokenLinks(firstPost, collectionApi.getAll(), true);
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

	eleventyConfig.addCollection("redirects", function (collectionApi) {
		// lets make a variable to hold our redirects
		let redirects = [];
		// We need to get each post in our posts folder. In my case this is /node
		const nodes = collectionApi.getFilteredByGlob(gardenStr);
		// next lets iterate over all the nodes
		nodes.forEach((node) =>
			// for each alias
			(node.data.aliases || []).forEach((alias) =>
				// push the target url and the old url
				redirects.push([
					slugify(node.data.page.url),
					slugify(node.data.page.url).replace(
						/\/[^\/]*?(\..+)?$/,
						`/${node.data.dontSlug ? alias : slugify(alias)}$1`,
					),
				]),
			),
		);

		return redirects;
	});

	taxes(eleventyConfig);

	javascript(eleventyConfig);
	scss(eleventyConfig);
	csv(eleventyConfig, markdown);

	eleventyConfig.setQuietMode(true);

	return {
		dir: {
			input: "src",
			output: "out",
		},
	};
}
