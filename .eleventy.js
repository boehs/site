import nunjucks from "nunjucks";
import slugify from "./utils/slugify.js";
import pluginRss from "@11ty/eleventy-plugin-rss";
import { build as esbuild } from "esbuild";

import { minify } from "html-minifier";
import { minify as minifyTs } from "terser";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const collectionControl = require("./src/_data/collectionsControl.json");

import { readFileSync } from "fs";
const flowerFile = readFileSync("src/_data/anim/starynight.txt", "utf8");

let gardenStr = "./src/pages/garden/node/**/*.{md,csv}";

import synHl from "@11ty/eleventy-plugin-syntaxhighlight";
import textInject from "./utils/text-inject.js";
import scss from "./conf/templating/scss.js";
import markdownIt from "./conf/templating/markdown.js";
import csv from "./conf/templating/csv.js";

import { embedMastodon } from "./conf/components/mastodon.js";

const railsEncode = (msg, rails) =>
    fence(msg.length, rails)
        .map((i) => msg[i])
        .join("");

function fence(length, rails) {
    const cycle_len = 2 * rails - 2;
    return Array.from({ length: rails }).flatMap((_, r) =>
        Array.from({ length }, (_, i) => i).filter(
            (i) => i % cycle_len === r || i % cycle_len === cycle_len - r,
        ),
    );
}

function evalInContext(js, context) {
    return function () {
        return eval(js);
    }.call(context);
}

export default function (eleventyConfig) {
    const markdown = markdownIt();

    eleventyConfig.addPlugin(synHl);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addNunjucksFilter("interpolate", function (str) {
        return nunjucks.renderString(str, this.ctx);
    });
    eleventyConfig.addFilter("dropContentFolder", (path, folder) =>
        path.replace(new RegExp(folder + "/"), ""),
    );
    eleventyConfig.addFilter("slugshive", (path) => slugify(path));
    eleventyConfig.addFilter(
        "rails",
        (str, n) =>
            `<a class="rails" href="mailto:${railsEncode(
                str,
                n,
            )}" n="${n}">${railsEncode(str, n)}</a>`,
    );

    eleventyConfig.addFilter("titleCase", (str) => {
        str = str.replace(
            /([^\W_]+[^\s-]*) */g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
        );

        // Certain minor words should be left lowercase unless
        // they are the first or last words in the string
        let lowers = [
            "A",
            "An",
            "The",
            "And",
            "But",
            "Or",
            "For",
            "Nor",
            "As",
            "At",
            "By",
            "For",
            "From",
            "In",
            "Into",
            "Near",
            "Of",
            "On",
            "Onto",
            "To",
            "With",
        ];
        for (const lower of lowers)
            str = str.replace(new RegExp("\\s" + lower + "\\s", "g"), (txt) =>
                txt.toLowerCase(),
            );

        // Certain words such as initialisms or acronyms should be left uppercase
        let uppers = ["Id", "Tv", "Css", "Rss", "Xz", "Js", "Html", "Llm"];
        for (const upper of uppers)
            str = str.replace(
                new RegExp("\\b" + upper + "\\b", "g"),
                upper.toUpperCase(),
            );

        return str;
    });

    eleventyConfig.addFilter("dateString", (date) =>
        date?.toLocaleDateString(),
    );

    eleventyConfig.addShortcode("getSvg", function (name) {
        const data = readFileSync(`./src/pages/garden/node/Assets/${name}.svg`);
        return data.toString("utf-8");
    });

    eleventyConfig.addAsyncShortcode("embedMastodon", embedMastodon);

    // sorry
    eleventyConfig.addFilter("footerBase", () => {
        return (
            "\n".repeat(flowerFile.split("?")[0].split("\n").length - 1) +
            // @ts-ignore
            flowerFile
                .match(/([^\n]*)\n\?/)[1]
                .replace(/[0-9]/g, (match) =>
                    " ".repeat(Number(match) + 2).substring(1),
                )
        );
    });

    eleventyConfig.addFilter("renderMd", (content) => markdown.render(content));

    eleventyConfig.setLibrary("md", markdown);
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
        if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
            return minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
        }
        return content;
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

    eleventyConfig.addNunjucksGlobal("getContext", function () {
        return this.ctx;
    });

    eleventyConfig.addNunjucksGlobal("getEnv", function (k, v) {
        return process.env[k] == v;
    });

    eleventyConfig.addFilter("getType", function (thing) {
        return {}.toString
            .call(thing)
            .match(/\s([a-zA-Z]+)/)[1]
            .toLowerCase();
    });

    eleventyConfig.addFilter("random", function (array) {
        return array[Math.floor(Math.random() * array.length)];
    });

    eleventyConfig.addFilter("rainbow", function (i, n) {
        return `hsl(${(360 / n) * i},50%,60%)`;
    });

    eleventyConfig.addCollection("ogReady", function (collectionApi) {
        return collectionApi
            .getFilteredByGlob("./src/pages/**/*.*")
            .filter(function (item) {
                return (
                    item.outputPath.endsWith("html") &&
                    (item.page.inputPath.endsWith(".md") ||
                        item.page.inputPath.endsWith("11ty.cjs")) &&
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

    eleventyConfig.addCollection("taxes", function (collectionApi) {
        // lets make a variable to hold our taxonomies and values
        let taxAndValues = [];
        // We need to get each post in our posts folder. In my case this is /node
        const nodes = collectionApi.getFilteredByGlob(gardenStr);
        // next lets iterate over all the nodes
        nodes.forEach((node) => {
            // and then iterate over the taxonomies
            for (const [taxonomy, value] of Object.entries(collectionControl)) {
                // I don't want to paginate date, for instance
                // this is why my collectionControl is using objects instead of arrays
                // @ts-ignore
                if (value.excludeFromPagination) continue;
                else if (node?.data?.[taxonomy]) {
                    // this is typeof on drugs
                    switch (
                        {}.toString
                            .call(node.data[taxonomy])
                            .match(/\s([a-zA-Z]+)/)[1]
                            .toLowerCase()
                    ) {
                        // if it is an array (for tags especially)
                        case "array":
                            node.data[taxonomy].forEach((item) => {
                                taxAndValues.push([taxonomy, item]);
                            });
                            break;
                        // otherwise
                        default:
                            taxAndValues.push([taxonomy, node.data[taxonomy]]);
                    }
                }
            }
        });

        // custom set, sets don't work with objects
        // @ts-ignore
        const unique = [...new Set(taxAndValues.map(JSON.stringify))].map(
            // @ts-ignore
            JSON.parse,
        );

        return unique;
    });

    eleventyConfig.addCollection("taxesDiffer", function (collectionApi) {
        let taxAndValues = [];
        const nodes = collectionApi.getFilteredByGlob(gardenStr);
        const differ =
            Object.keys(collectionControl)[
                Object.values(collectionControl).findIndex(
                    // @ts-ignore
                    (value) => value.mode == "differentiator",
                )
            ];
        nodes.forEach((node) => {
            for (const [taxonomy, value] of Object.entries(collectionControl)) {
                // @ts-ignore
                if (value.excludeFromPagination) continue;
                else if (node?.data?.[taxonomy]) {
                    switch (
                        {}.toString
                            .call(node.data[taxonomy])
                            .match(/\s([a-zA-Z]+)/)[1]
                            .toLowerCase()
                    ) {
                        case "array": {
                            node.data[taxonomy].forEach((item) => {
                                if (
                                    !(
                                        taxonomy == differ &&
                                        item == node.data[differ]
                                    )
                                )
                                    taxAndValues.push([
                                        taxonomy,
                                        item,
                                        node.data[differ],
                                    ]);
                            });
                            break;
                        }
                        default:
                            if (
                                !(
                                    taxonomy == differ &&
                                    node.data[taxonomy] == node.data[differ]
                                )
                            )
                                taxAndValues.push([
                                    taxonomy,
                                    node.data[taxonomy],
                                    node.data[differ],
                                ]);
                    }
                }
            }
        });

        // custom set, sets don't work with objects
        // @ts-ignore
        const unique = [...new Set(taxAndValues.map(JSON.stringify))].map(
            // @ts-ignore
            JSON.parse,
        );

        return unique;
    });

    eleventyConfig.addCollection("nestedTax", function (collectionApi) {
        let nestedTax = {};
        const nodes = collectionApi.getFilteredByGlob(gardenStr);
        nodes.forEach((node) => {
            for (const [taxonomy, value] of Object.entries(collectionControl)) {
                const taxValue = node.data[taxonomy];

                // @ts-ignore
                if (value.excludeFromPagination) continue;
                else if (node?.data?.[taxonomy]) {
                    if (!nestedTax[taxonomy]) nestedTax[taxonomy] = {};
                    switch (
                        {}.toString
                            .call(taxValue)
                            .match(/\s([a-zA-Z]+)/)[1]
                            .toLowerCase()
                    ) {
                        case "array": {
                            taxValue.forEach((item) => {
                                // if the value in the object does not yet exist
                                if (!nestedTax[taxonomy][item])
                                    nestedTax[taxonomy][item] = [];
                                // then add the entire page to it
                                nestedTax[taxonomy][item].push(node);
                            });
                            break;
                        }
                        // otherwise
                        default: {
                            // if the value in the object does not yet exist
                            if (!nestedTax[taxonomy][taxValue])
                                nestedTax[taxonomy][taxValue] = [];
                            // then add the entire page to it
                            nestedTax[taxonomy][taxValue].push(node);
                        }
                    }
                }
            }
        });

        return nestedTax;
    });

    eleventyConfig.addTemplateFormats("ts");
    eleventyConfig.addExtension("ts", {
        outputFileExtension: "js",
        // @ts-ignore
        compile: async function (inputContent, inputPath) {
            return async (data) => {
                const result = await esbuild({
                    entryPoints: [inputPath],
                    define: {},
                    //format: "esm",
                    platform: "browser",
                    minify: false, // process.env.NODE_ENV === "production",
                    bundle: true,
                    write: false,
                });

                let r2 = await minifyTs(result.outputFiles[0].text, {
                    module: true,
                    ecma: 2017,
                    compress: {
                        booleans_as_integers: true,
                        unsafe: true,
                        unsafe_math: true,
                    },
                });
                return textInject(r2.code).replaceAll(
                    /{{{(.*?)}}}/g,
                    (...match) => evalInContext(match[1], data),
                );
            };
        },
        compileOptions: {
            permalink: function (contents, inputPath) {
                return inputPath
                    .replace("src/scripts/", "")
                    .replace("ts", "js");
            },
        },
    });

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
