import cfg from "../src/_data/config.json";

export async function onRequest(context: EventContext): PagesFunction {
    // Contents of context object
    const {
        next, // used for middleware or to fetch assets
    } = context;

    const cacheUrl = new URL(context.request.url);

    // Construct the cache key from the cache URL
    const cacheKey = new Request(cacheUrl.toString(), context.request);
    const cache = caches.default;

    let response = await cache.match(cacheKey);

    if (!response) {
        response = await next();
        response.headers.set(
            "Cache-Control",
            "public, max-age=86400, stale-while-revalidate=59",
        );
        let day = new Date();
        let api = await fetch(
            `${cfg.analytics.base}/api/websites/${
                cfg.analytics.id
            }/stats?startAt=${
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

        let re = res.transform(response);
        context.waitUntil(cache.put(cacheKey, re.clone()));

        return re;
    }

    return response;
}
