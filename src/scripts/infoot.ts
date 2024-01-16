function ordinal(n: number) {
    var s = ["th", "st", "nd", "rd"];
    var v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

(async () => {
    let root = "{{{this.config.analytics.base}}}/api/";
    let siteId = "/{{{this.config.analytics.id}}}/";

    let token = await fetch(`${root}share/{{{this.config.analytics.pub}}}`)
        .then((v) => v.json())
        .then((j) => j.token as string);
    let h: RequestInit = {
        headers: {
            "X-Umami-Share-Token": token,
        },
    };
    let range = (await fetch(`${root}websites${siteId}daterange`, h).then(
        (res) => res.json(),
    )) as { maxdate: string; mindate: string };
    let res = (
        (await fetch(
            `${root}websites${siteId}stats?` +
                // @ts-ignore
                new URLSearchParams({
                    startAt: Date.parse(range.mindate),
                    endAt: Date.parse(range.maxdate),
                    url: window.location.pathname,
                }),
            h,
        ).then((res) => res.json())) as {
            pageviews: {
                value: number;
            };
        }
    ).pageviews.value;
    if (res > 0) {
        let el = document.querySelector("article")!;
        el.innerHTML += `<hr/><p>You are the <strong>${ordinal(
            res,
        )}</strong> visitor to this page!</p>`;
    }
})();
