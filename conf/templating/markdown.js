import mdItToC from "markdown-it-table-of-contents";
import mdItAc from "markdown-it-anchor";
import mdItAttr from "markdown-it-attrs";
import mmdItWl from "@gardeners/markdown-it-wikilinks";
import mdItC from "markdown-it-container";
import mdItOtherAttrLol from "markdown-it-attribution";
import mdItFootnote from "markdown-it-footnote";
import mdItFig from "markdown-it-image-figures";

import mdIt from "markdown-it";
import sanitize from "sanitize-filename";
import slugify from "../../utils/slugify.js";

import iterator from "markdown-it-for-inline";

import Shiki from "@shikijs/markdown-it";
import { transformerNotationDiff } from "@shikijs/transformers";
import { gruvBoxDarkHard } from "./highlight.js";

const shiki = await Shiki({
    langs: [
        "html",
        "css",
        "scss",
        "javascript",
        "typescript",
        "json",
        "yaml",
        "shell",
        "graphql",
        "rust",
        "swift",
        "regex",
        "toml",
        "liquid",
    ],
    theme: gruvBoxDarkHard,
    transformers: [transformerNotationDiff()],
});

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
            uriSuffix: "",
        }),
    )
    // ::: details <Summary goes here>
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
    .use(mdItC, "figure", {
        validate: function (params) {
            return params.trim().match(/^figure\s+(.*)$/);
        },

        render: function (tokens, idx) {
            if (tokens[idx].nesting === 1) {
                // opening tag
                return `<figure>\n`;
            } else {
                let i = idx - 1;
                while (tokens[i].type !== "container_figure_open") {
                    i--;
                }
                let m = tokens[i].info.trim().match(/^figure\s+(.*)$/);
                return `<figcaption>${markdownIt.utils.escapeHtml(
                    m[1],
                )}</figcaption></figure>\n`;
            }
        },
    })
    .use(mdItOtherAttrLol, {
        marker: "--",
        removeMarker: false,
    })
    .use(mdItFootnote)
    .use(mdItFig, {
        figcaption: "alt",
    })
    .use(iterator, "external_url_img", "link_open", function (tokens, idx) {
        let host = null;
        try {
            host = new URL(tokens[idx].attrGet("href"));
        } catch {}
        if (host?.hostname != "boehs.org")
            tokens[idx].attrPush([
                "style",
                `--url: url("https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(
                    `${host?.protocol}//${host?.hostname}`,
                )}")`,
            ]);
    })
    .use(shiki);

markdownIt.renderer.rules.footnote_block_open = () =>
    "<hr/>\n" +
    "<h2>👟 Footnotes</h2>\n" +
    '<section class="footnotes">\n' +
    '<ol class="footnotes-list">\n';

markdownIt.renderer.rules.footnote_caption = function (tokens, idx) {
    let n = Number(tokens[idx].meta.id + 1).toString();
    if (tokens[idx].meta.subId > 0) n += `:${tokens[idx].meta.subId}`;
    return `${n}`;
};

export default function markdown() {
    return markdownIt;
}
