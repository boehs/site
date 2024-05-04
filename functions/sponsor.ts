import cfg from "../src/_data/config.json";

export async function onRequest(context: EventContext): PagesFunction {
    // Contents of context object
    const {
        next, // used for middleware or to fetch assets
    } = context;

    const response = await next();
    response.headers.set(
        "Cache-Control",
        "public, max-age=86400, stale-while-revalidate=59",
    );
    let day = new Date();
    const cacheUrl = new URL(
        `${cfg.analytics.base}/api/websites/${cfg.analytics.id}/stats?startAt=${
            day.setUTCHours(0, 0, 0, 0) - 60 * 60 * 24 * 30 * 1000
        }&endAt=${day.setUTCHours(0, 0, 0, 0)}`,
    );

    // Construct the cache key from the cache URL
    const cacheKey = new Request(cacheUrl.toString(), context.request);
    const cache = caches.default;

    let api = await cache.match(cacheKey);
    if (!api) {
        api = await fetch(cacheUrl, {
            headers: {
                "X-Umami-Share-Token": cfg.analytics.pub,
            },
            cf: {
                cacheTtl: 60 * 60 * 60 * 24,
                cacheEverything: true,
            },
        });
        context.waitUntil(cache.put(cacheKey, api.clone()));
    }

    const api2: {
        pageviews: {
            value: number;
        };
    } = await api.json();

    let res = new HTMLRewriter().on("#viewcount", {
        element(element) {
            element.setInnerContent(api2.pageviews.value);
        },
    });

    return res.transform(response);
}
