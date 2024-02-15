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
                element.removeAttribute("id");

                if (greeting.about) {
                    element.setInnerContent(
                        `<a href="${greeting.about}" title="teach me something new">${greeting.language}</a>`,
                        { html: true },
                    );
                } else {
                    element.setInnerContent(greeting.language);
                }
            },
        });

    if (context.request.url.endsWith("?spa")) {
        return res
            .on(".p-author.h-card,footer", {
                element(el) {
                    el.remove();
                },
            })
            .on("body > div, header", {
                element(el) {
                    el.removeAndKeepContent();
                },
            })
            .transform(response);
    }

    return res.transform(response);
}
