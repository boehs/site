import * as sass from "sass";
import postcss from "postcss";
import path from "path";
import postcsso from "postcss-csso";
import postcsssortmediaqueries from "postcss-sort-media-queries";

/** @param {import("@11ty/eleventy/UserConfig").default} eleventyConfig */
export default function scss(eleventyConfig) {
	eleventyConfig.addTemplateFormats("scss");
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		compile: async function (inputContent, inputPath) {
			if (inputPath.split("/").at(-1).startsWith("_")) return;

			const { css, loadedUrls } = sass.compileString(inputContent, {
				loadPaths: [path.parse(inputPath).dir || "."],
				sourceMap: false,
			});

			this.addDependencies(inputPath, loadedUrls);

			return async () => {
				if (process.env.ELEVENTY_ENV === "production") {
					const { content } = await postcss([
						postcsssortmediaqueries(),
						postcsso({
							restructure: true,
						}),
					]).process(css, {
						from: undefined,
					});

					return content;
				} else {
					return css;
				}
			};
		},
		compileOptions: {
			permalink: function (contents, inputPath) {
				return inputPath.replace("src/styles/", "").replace("scss", "css");
			},
		},
	});
}
