import nunjucks from "nunjucks";
import sanitize from "sanitize-filename";
import slugify from "./utils/slugify.js";
import pluginRss from "@11ty/eleventy-plugin-rss";
import { build as esbuild } from "esbuild";
import * as sass from "sass";
import postcss from "postcss";
import { minify } from "html-minifier";
import { minify as minifyTs } from "terser";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const collectionControl = require("./src/_data/collectionsControl.json");
const extraRedirects = require("./src/_config/redirects.json");

import { readFileSync } from "fs";
const flowerFile = readFileSync("src/_data/anim/starynight.txt", "utf8");

import mdIt from "markdown-it";

import mdItToC from "markdown-it-table-of-contents";
import mdItAc from "markdown-it-anchor";
import mdItAttr from "markdown-it-attrs";
import mmdItWl from "@gardeners/markdown-it-wikilinks";
import mdItC from "markdown-it-container";
import mdItOtherAttrLol from "markdown-it-attribution";

import synHl from "@11ty/eleventy-plugin-syntaxhighlight";
import path from "path";
import textInject from "./utils/text-inject.js";

function markdownIt() {
    let options = {
        html: true,
        breaks: true,
        typographer: true,
        linkify: true,
    };
    let markdownIt = mdIt(options);

    markdownIt.renderer.rules.blockquote_open = function (token, idx) {
        return `<blockquote${
            token[idx + 2].content.toLowerCase().includes("[[penpen]]'s note")
                ? ` class="penpen"`
                : ""
        }>`;
    };

    return (
        markdownIt
            //.use(require("markdown-it-obsidian")({baseURL: '/pages/c/'}))
            .use(mdItToC, { includeLevel: [2, 3, 4, 5] })
            .use(mdItAc)
            .use(mdItAttr)
            .use(
                mmdItWl({
                    postProcessPageName: (pageName) => {
                        pageName = pageName.trim();
                        pageName = pageName.split("/").map(sanitize).join("/");
                        pageName = slugify(pageName);
                        return pageName;
                    },
                    imagePattern: /!\[\[([^]+?)\]\]/,
                    assetPrefix: "/assets/",
                }),
            )
            .use(mdItC, "details", {
                validate: function (params) {
                    return params.trim().match(/^details\s+(.*)$/);
                },

                render: function (tokens, idx) {
                    var m = tokens[idx].info.trim().match(/^details\s+(.*)$/);
                    if (tokens[idx].nesting === 1) {
                        // opening tag
                        return (
                            "<details><summary>" +
                            markdownIt.utils.escapeHtml(m[1]) +
                            "</summary>\n"
                        );
                    } else {
                        // closing tag
                        return "</details>\n";
                    }
                },
            })
            .use(mdItOtherAttrLol, {
                marker: "--",
                removeMarker: false,
            })
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

    // sorry
    eleventyConfig.addFilter("footerBase", () => {
        return (
            "\n".repeat(flowerFile.split("?")[0].split("\n").length - 1) +
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
        const firstPost = collectionApi.getFilteredByGlob(
            "./src/pages/garden/node/*.md",
        )[0].data;
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

    eleventyConfig.addCollection("redirects", function (collectionApi) {
        // lets make a variable to hold our redirects
        let redirects = [];
        // We need to get each post in our posts folder. In my case this is /node
        const nodes = collectionApi.getFilteredByGlob(
            "./src/pages/garden/node/*.md",
        );
        // next lets iterate over all the nodes
        nodes.forEach((node) =>
            // for each alias
            (node.data.aliases || []).forEach((alias) =>
                // push the target url and the old url
                redirects.push([
                    slugify(node.data.page.url),
                    slugify(node.data.page.url).replace(
                        /\/[^\/]*?(\..+)?$/,
                        `/${slugify(alias)}$1`,
                    ),
                ]),
            ),
        );

        redirects = [...redirects, ...extraRedirects];

        return redirects;
    });

    eleventyConfig.addCollection("taxes", function (collectionApi) {
        // lets make a variable to hold our taxonomies and values
        let taxAndValues = [];
        // We need to get each post in our posts folder. In my case this is /node
        const nodes = collectionApi.getFilteredByGlob(
            "./src/pages/garden/node/*.md",
        );
        // next lets iterate over all the nodes
        nodes.forEach((node) => {
            // and then iterate over the taxonomies
            for (const [taxonomy, value] of Object.entries(collectionControl)) {
                // I don't want to paginate date, for instance
                // this is why my collectionControl is using objects instead of arrays
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
        const unique = [...new Set(taxAndValues.map(JSON.stringify))].map(
            JSON.parse,
        );

        return unique;
    });

    eleventyConfig.addCollection("taxesDiffer", function (collectionApi) {
        let taxAndValues = [];
        const nodes = collectionApi.getFilteredByGlob(
            "./src/pages/garden/node/*.md",
        );
        const differ =
            Object.keys(collectionControl)[
                Object.values(collectionControl).findIndex(
                    (value) => value.mode == "differentiator",
                )
            ];
        nodes.forEach((node) => {
            for (const [taxonomy, value] of Object.entries(collectionControl)) {
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
        const unique = [...new Set(taxAndValues.map(JSON.stringify))].map(
            JSON.parse,
        );

        return unique;
    });

    eleventyConfig.addCollection("nestedTax", function (collectionApi) {
        let nestedTax = {};
        const nodes = collectionApi.getFilteredByGlob(
            "./src/pages/garden/node/*.md",
        );
        nodes.forEach((node) => {
            for (const [taxonomy, value] of Object.entries(collectionControl)) {
                const taxValue = node.data[taxonomy];

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
        compile: async function (inputContent, inputPath) {
            return async (data) => {
                const result = await esbuild({
                    entryPoints: [inputPath],
                    define: {},
                    format: "esm",
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
                    require("postcss-csso")({
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

    eleventyConfig.setQuietMode(true);

    return {
        dir: {
            input: "src",
            output: "out",
        },
    };
}
