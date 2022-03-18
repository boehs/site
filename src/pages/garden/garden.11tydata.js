// This regex finds all wikilinks in a string
const wikilinkRegExp = /\[\[([^|]+?)(\|([\s\S]+?))?\]\]/g

function caselessCompare(a, b) {
    return a.toLowerCase() === b.toLowerCase();
}

module.exports = {
    layout: "post.njk",
    in: "garden",
    hasCodeBlock: true,
    permalink: "{{ page.filePathStem | dropContentFolder: \"pages/garden\" }}.html",
    eleventyComputed: {
        backlinks: (data) => {
            const notes = data.collections.all;
            const currentFileSlug = data.page.filePathStem.replace('/pages/garden/node/', '');
            let backlinks = [];

            data.internal.exists?.add(currentFileSlug.toLowerCase())
            
            // Search the other notes for backlinks
            for(const otherNote of notes) {
                const noteContent = otherNote.template.frontMatter.content;
                // Get all links from otherNote
                
                const outboundLinks = (function() {switch (otherNote.data.links) {
                    case undefined: {
                        const links = (noteContent.match(wikilinkRegExp) || [])
                        .map(link => (
                            // Extract link location
                            link.slice(2,-2)
                                .split("|")[0]
                                .replace(/.(md|markdown)\s?$/i, "")
                                .trim()
                        ));
                        otherNote.data.links = links
                        return links
                    }
                    default: return otherNote.data.links
                }})()
                // If the other note links here, return related info
                if(outboundLinks.some(link => caselessCompare(link, currentFileSlug))) {
                    backlinks.push({
                        url: otherNote.url,
                        title: otherNote.data.title,
                    })
                }
                
                outboundLinks.forEach(link => {
                    if (!data.internal.exists.has(link.toLowerCase())) data.internal.four.add(link)
                })
            }
            return backlinks;
        }
    }
}
