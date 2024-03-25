import { is } from "./api/is";
import greetings from "../src/_data/deets/greatings.json";
import { countRss } from "rsslytics";

// @ts-expect-error
export async function onRequest(context: EventContext): PagesFunction {
    // Contents of context object
    const {
        next, // used for middleware or to fetch assets
    } = context;

    const response = await next();

    if (context.request.url.endsWith(".xml")) {
        let data = countRss(
            context.request.headers.get("User-Agent"),
            context.request.url,
            context.request.headers.get("cf-connecting-ip"),
        );
        await context.env.RSSLYTICS.prepare(
            `INSERT INTO log (date, readerId, ip, feedUrl, feedId, subscriberCount, readerName, readerVersion, userAgent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
            .bind(
                data.date,
                data.readerId,
                data.ip || "",
                data.feedUrl,
                data.feedId,
                data.subscriberCount,
                data.readerName,
                data.readerVersion,
                data.userAgent,
            )
            .run();

        return response;
    }

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
