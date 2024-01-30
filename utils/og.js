import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

await mkdir("out/og", { recursive: true });

const fonts = [];

{
    const [base, italic, bold, office] = await Promise.all([
        readFile(`./src/_public/spectralregular.woff`),
        readFile(`./src/_public/spectralitalic.woff`),
        readFile(`./src/_public/spectralbold.woff`),
        readFile(`./src/_public/office.ttf`),
    ]);

    fonts.push(
        {
            name: "Spectral",
            data: base,
            weight: 400,
            style: "normal",
        },
        {
            name: "Spectral",
            data: italic,
            weight: 400,
            style: "italic",
        },
        {
            name: "Spectral",
            data: bold,
            weight: 700,
            style: "normal",
        },
        {
            name: "monospace",
            data: office,
            weight: 700,
            style: "normal",
        },
    );
}

function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        nbsp: " ",
        amp: "&",
        quot: '"',
        lt: "<",
        gt: ">",
    };
    return encodedString
        .replace(translate_re, function (match, entity) {
            return translate[entity];
        })
        .replace(/&#(\d+);/gi, function (match, numStr) {
            var num = parseInt(numStr, 10);
            return String.fromCharCode(num);
        });
}

const svg = async ({ title, date, desc, color = "#3C898B" }) => {
    return await satori(
        // @ts-ignore
        {
            type: "div",
            props: {
                style: {
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    color: "#101010",
                    backgroundColor: "hsl(20, 100%, 98%)",
                    padding: "48px",
                    fontSize: "40px",
                    fontFamily: "Spectral",
                },
                children: [
                    {
                        type: "pre",
                        props: {
                            style: {
                                position: "absolute",
                                right: "30px",
                                bottom: "-18px",
                                marginBottom: "0px",
                                fontSize: "32px",
                                fontWeight: "bolder",
                                color,
                                opacity: "0.25",
                                fontFamily: "monospace",
                            },
                            children:
                                ".            +                /`\\     x     (         /`\\\n    x                  /`\\   // \\\\          ))   *   // \\\\\n          *     .     // \\\\  // \\\\  /`\\_____||       // \\\\\n                      // \\\\  // \\\\ // /       \\  /`\\ // \\\\\n.        +            // \\\\  // \\\\ ///_________\\// \\\\// \\\\\n                      // \\\\  // \\\\ // |-[+]---| // \\\\// \\\\\n                      // \\\\  // \\\\ // |-------| // \\\\// \\\\\n          _____,....-----'------'-----''-------'---'----'--\n        ",
                        },
                    },
                    {
                        type: "div",
                        props: {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                            },
                            children: [
                                {
                                    type: "h1",
                                    props: {
                                        style: {
                                            fontSize: "48px",
                                            marginTop: 0,
                                            marginBottom: "5px",
                                            fontWeight: "bold",
                                        },
                                        children: title,
                                    },
                                },
                                {
                                    type: "em",
                                    props: {
                                        style: {
                                            margin: 0,
                                            color: "#878482",
                                        },
                                        children: desc,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        type: "div",
                        props: {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                            },
                            children: [
                                {
                                    type: "p",
                                    props: {
                                        style: {
                                            margin: 0,
                                            fontSize: "32px",
                                            marginBottom: "5px",
                                            color: "#878482",
                                        },
                                        children: date,
                                    },
                                },
                                {
                                    type: "strong",
                                    props: {
                                        style: {
                                            color,
                                        },
                                        children: "Evan Boehs",
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            fonts,
            height: 630,
            width: 1200,
        },
    );
};

let dirs = (await readdir("./out", { recursive: true, withFileTypes: true }))
    .filter((dir) => dir.isFile())
    .filter((dir) => dir.name.endsWith("html"))
    .map((dir) => dir.path + "/" + dir.name);

let now = performance.now();
let timeSpentParsing = 0;
let madeDirs = new Set();
for (let f of dirs) {
    let file = decodeEntities((await readFile(f)).toString());
    let title = (file.match(/<title>(.*?)<\//) || [])[1];
    if (title == "missing") continue;
    if (title.startsWith("Redirecting to: ")) continue;
    let date = (file.match(/dt-published">(.*?)<\//) || [])[1];
    let desc = (file.match(/name="description" content="(.*?)"/) || [])[1];
    let color = (((file.match(/<body .*?>/) || [])[0] || "").match(
        /light: (.*?)">/,
    ) || [])[1];
    let now = performance.now();
    const renderedSvg = await svg({ title, date, desc, color });
    const png = new Resvg(renderedSvg, {
        font: {
            loadSystemFonts: false,
        },
    })
        .render()
        .asPng();
    timeSpentParsing += performance.now() - now;
    let url = `out/og/${f
        .split("/")
        .slice(0, -1)
        .join("/")
        .replace("out/", "")}`;
    if (!madeDirs.has(url)) {
        try {
            await mkdir(url, { recursive: true });
        } catch (e) {
            if (e.code != "EEXIST") throw e;
        }
        madeDirs.add(url);
    }
    await writeFile(
        `out/og/${f.replace("out/", "").replace("html", "png")}`,
        png,
    );
}
console.log(
    `wrote ${dirs.length} files in ${performance.now() - now}ms (avg: ${
        (performance.now() - now) / dirs.length
    }) (${performance.now() - now - timeSpentParsing})`,
);
