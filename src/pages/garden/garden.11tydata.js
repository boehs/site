// Heavily modified from Binyamin Aron Green's https://github.com/binyamin/eleventy-garden
// The license of this file has been derived.

import slugshive from "../../../utils/slugify.js";

// This regex finds all wikilinks in a string
const wikilinkRegExp = /(?<!!)\[\[([^|]+?)(\|([\s\S]+?))?\]\]/g;

function backlinksApi(data) {
    const notes = data.collections.all;
    const currentFileSlug = slugshive(
        data.page.url
            ? data.page.url.replace("/node/", "").replace(".html", "")
            : data.page.filePathStem.replace("/pages/garden/node/", ""),
    );

    let backlinks = [];

    data.internal.exists?.add(currentFileSlug);

    // Search the other notes for backlinks
    for (const otherNote of notes) {
        const noteContent = otherNote.rawInput;
        const noteAsLink = slugshive(
            otherNote.data.page.url
                ? data.page.url.replace("/node/", "").replace(".html", "")
                : otherNote.data.page.filePathStem.replace(
                      "/pages/garden/node/",
                      "",
                  ),
        );

        data.internal.exists?.add(noteAsLink);

        // Get all links from otherNote
        const outboundLinks = (function () {
            switch (otherNote.data.links) {
                case undefined: {
                    const links = (noteContent.match(wikilinkRegExp) || []).map(
                        (link) =>
                            // Extract link location
                            slugshive(link)
                                .slice(2, -2)
                                .split("|")[0]
                                .replace(/.(md|markdown)\s?$/i, "")
                                .trim()
                                .toLowerCase(),
                    );
                    otherNote.data.links = links;
                    return links;
                }
                default:
                    return otherNote.data.links;
            }
        })();
        // If the other note links here, return related info
        if (outboundLinks.some((link) => link === currentFileSlug)) {
            backlinks.push({
                url: otherNote.url,
                title: otherNote.data.title,
            });
        }

        (otherNote.data.aliases || []).forEach(function (alias) {
            data.internal.exists?.add(slugshive(alias));
        });

        outboundLinks.forEach((link) => {
            if (!data.internal.exists.has(link))
                data.internal.four.add(
                    data.page.url.replace(/\/[^\/]*?(\..+)?$/, `/${link}$1`),
                );
        });
    }
    return [backlinks, data.internal.four];
}

export default {
    layout: "post.njk",
    in: "garden",
    hasCodeBlock: true,
    structuredData: {
        type: "BlogPosting",
    },
    permalink:
        '{{ page.filePathStem | dropContentFolder: "pages/garden" | slugshive}}.html',
    eleventyComputed: {
        backlinks: (data) => {
            return backlinksApi(data)[0];
        },
        brokenLinks: (data, canRun = false) => {
            if (!canRun) return "not called from 11ty config";
            return backlinksApi(data)[1];
        },
    },
};
