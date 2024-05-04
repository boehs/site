import cfg from "../src/_data/config.json";

export async function onRequest(context: EventContext): PagesFunction {
    // Contents of context object
    const {
        next, // used for middleware or to fetch assets
    } = context;

    const response = await next();
    let day = new Date();
    let api = await fetch(
        `${cfg.analytics.base}/api/websites/${cfg.analytics.id}/stats?startAt=${
            day.setUTCHours(0, 0, 0, 0) - 60 * 60 * 24 * 30 * 1000
        }&endAt=${day.setUTCHours(0, 0, 0, 0)}`,
        {
            headers: {
                "X-Umami-Share-Token": cfg.analytics.pub,
            },
            cf: {
                cacheTtl: 60 * 60 * 60 * 24,
                cacheEverything: true,
            },
        },
    ).then(
        (res) =>
            res.json() as Promise<{
                pageviews: {
                    value: number;
                };
            }>,
    );

    let res = new HTMLRewriter().on("#viewcount", {
        element(element) {
            element.setInnerContent(api.pageviews.value);
        },
    });

    return res.transform(response);
}
