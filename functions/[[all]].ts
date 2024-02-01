import { is } from "./api/is";
import greetings from "../src/_data/deets/greatings.json";

// @ts-expect-error
export async function onRequest(context): PagesFunction {
    // Contents of context object
    const {
        next, // used for middleware or to fetch assets
    } = context;
    let now = performance.now();
    const response = await next();
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    let isT = "is " + is[Math.floor(Math.random() * is.length)];

    let res = new HTMLRewriter()
        .on("i#is", {
            element(element) {
                element.setInnerContent(isT);
            },
        })
        .on(".needstitle", {
            element(element: HTMLSpanElement) {
                element.setInnerContent(greeting.hello + " 👋");
                element.removeAttribute("class");
            },
        })
        .on("#needslang", {
            element(element: HTMLSpanElement) {
                element.setInnerContent(greeting.language);
                element.removeAttribute("id");

                if (greeting.about) {
                    element.tagName = "a";
                    element.setAttribute("title", "teach me something new!");
                    element.setAttribute("href", greeting.about);
                }
            },
        });

    if (context.request.url.endsWith("?spa")) {
        let json = {
            main: "",
            head: "",
            message: "",
            color: "",
        };
        await res
            .on("header i", {
                text({ text }) {
                    json.message += text;
                },
            })
            .on("head", {
                text({ text }) {
                    json.head += text;
                },
            })
            .on("head *", {
                element(el) {
                    const maybeAttrs = [...el.attributes]
                        .map(([k, v]) => ` ${k}="${v}"`)
                        .join("");
                    json.head += `<${el.tagName}${maybeAttrs}>`;
                    try {
                        el.onEndTag((endTag) => {
                            json.head += `</${endTag.name}>`;
                        });
                    } catch {}
                },
            })
            .on("main", {
                text({ text }) {
                    json.main += text;
                },
            })
            .on("body", {
                element(el) {
                    json.color += el.getAttribute("style");
                },
            })
            .on("main *", {
                element(el) {
                    const maybeAttrs = [...el.attributes]
                        .map(([k, v]) => ` ${k}="${v}"`)
                        .join("");
                    json.main += `<${el.tagName}${maybeAttrs}>`;
                    try {
                        el.onEndTag((endTag) => {
                            json.main += `</${endTag.name}>`;
                        });
                    } catch {}
                },
            })
            .transform(response)
            .arrayBuffer();

        if (json.message == "is") json.message = isT;
        if (json.color == "undefined" || json.color == "null") json.color = "";

        return new Response(JSON.stringify(json), {
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
        });
    }

    return res.transform(response);
}
