function ordinal(n: number) {
    var s = ["th", "st", "nd", "rd"];
    var v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

(async () => {
    let root = "{{{this.config.analytics.base}}}/api/";
    let siteId = "websites/{{{this.config.analytics.id}}}/";

    let token = (
        await fetch(`${root}share/{{{this.config.analytics.pub}}}`).then((v) =>
            v.json(),
        )
    ).token as string;
    let headers: RequestInit = {
        headers: {
            "X-Umami-Share-Token": token,
        },
    };
    let res = (
        await fetch(`${root}${siteId}daterange`, headers)
            .then(
                (res) =>
                    res.json() as Promise<{ maxdate: string; mindate: string }>,
            )
            .then((r) =>
                fetch(
                    `${root}${siteId}stats?` +
                        // @ts-ignore
                        new URLSearchParams({
                            startAt: Date.parse(r.mindate),
                            endAt: Date.parse(r.maxdate),
                            url: window.location.pathname,
                        }),
                    headers,
                ),
            )
            .then(
                (res) =>
                    res.json() as Promise<{
                        pageviews: {
                            value: number;
                        };
                    }>,
            )
    ).pageviews.value;
    let el = document.querySelector("article")!;
    el.innerHTML += `<hr/><p>You are the <strong>${ordinal(
        res + 1,
    )}</strong> visitor to this page!</p>`;
})();
