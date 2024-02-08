import * as sass from "sass";
import postcss from "postcss";
import path from "path";
import postcsso from "postcss-csso";

export default function scss(eleventyConfig) {
    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        compile: async function (inputContent, inputPath) {
            if (inputPath.split("/").at(-1).startsWith("_")) return;

            let { css, loadedUrls } = sass.compileString(inputContent, {
                loadPaths: [path.parse(inputPath).dir || "."],
                sourceMap: false,
            });

            this.addDependencies(inputPath, loadedUrls);

            return async () => {
                const { content } = await postcss([
                    postcsso({
                        restructure: true,
                    }),
                ]).process(css, {
                    from: undefined,
                });

                return content;
            };
        },
        compileOptions: {
            permalink: function (contents, inputPath) {
                return inputPath
                    .replace("src/styles/", "")
                    .replace("scss", "css");
            },
        },
    });
}
