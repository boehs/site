import satori from "satori";
import { readFile } from "node:fs/promises";

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

export const svg = async ({ title, date, desc, color = "#3C898B" }) => {
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
