// but-csv
function* c(t) {
    let e = 0,
        l = -1,
        C = t.length,
        p = [],
        i,
        n,
        r = (o) => t.charCodeAt(e),
        s = (o) => (i += t.slice(e, (e = o))),
        _,
        d = (o) => ((_ = t.indexOf(o, e)) < 0 ? C : _);
    for (; r() == 10 && (yield p.splice(0), ++e), e < C; ) {
        if (((i = ""), r() == 34))
            for (; ++e, s(d('"')), ++e < C && (n = r()) != 44 && n != 10; )
                (e -= n != 34), (i += '"');
        else
            s(
                (n = d(",")) >
                    (l =
                        e > l
                            ? d(`
`)
                            : l)
                    ? l
                    : n,
            );
        p.push(i), (e += r() == 44);
    }
    yield p;
}
let parse = (t) => [...c(t)];

export default function csv(eleventyConfig, markdown) {
    eleventyConfig.addTemplateFormats("csv");
    eleventyConfig.addExtension("csv", {
        outputFileExtension: "html",
        /**
         *
         * @param {string} inputContent
         * @returns
         */
        compile: async (inputContent) => {
            inputContent = inputContent.trim();
            let end = "";

            if (inputContent.endsWith("---")) {
                let split = inputContent.split("\n---\n", 2);
                end = split[1];
                inputContent = split[0];
            }

            let output = "<table><thead>",
                lines = parse(inputContent);
            let longest = 0;
            for (let i = 0; i < lines.length; i++) {
                longest = longest > lines[i].length ? longest : lines[i].length;
                if (longest > lines[i].length)
                    lines[i] = [
                        ...lines[i],
                        ...new Array(longest - lines[i].length).fill(" "),
                    ];
                if (i > 0) {
                    // is a normal row
                    output +=
                        "<tr><td>\n\n" +
                        lines[i]
                            .map((l) => l || "-")
                            .join("\n\n</td><td>\n\n") +
                        "\n\n</td></tr>";
                } else {
                    // is a heading
                    output +=
                        "<tr><th>" +
                        lines[i].join("</th><th>") +
                        "</th></tr></thead><tbody>";
                }
            }
            output += "</tbody></table>";
            output = markdown.render(output + "\n" + end.slice(0, -3));

            // @ts-ignore
            return async (d) => {
                return output;
            };
        },
    });
}
