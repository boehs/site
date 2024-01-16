function ordinal(n: number) {
    var s = ["th", "st", "nd", "rd"];
    var v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

(async () => {
    let root = "{{{this.config.analytics.base}}}/api/";

    let token = (
        await fetch(`${root}share/{{{this.config.analytics.pub}}}`).then((v) =>
            v.json(),
        )
    ).token as string;
    let res = (
        await fetch(
            `${root}websites/{{{this.config.analytics.id}}}/stats?` +
                // @ts-ignore
                new URLSearchParams({
                    url: window.location.pathname,
                }),
            {
                headers: {
                    "X-Umami-Share-Token": token,
                },
            },
        ).then(
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
