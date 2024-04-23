import cfg from "../src/_data/config.json";

export async function onRequest(context: EventContext): PagesFunction {
    // Contents of context object
    const {
        next, // used for middleware or to fetch assets
    } = context;

    const response = await next();

    let api = await fetch(
        `${cfg.analytics.base}/api/websites/${cfg.analytics.id}/stats`,
        {
            headers: {
                "X-Umami-Share-Token": cfg.analytics.pub,
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
