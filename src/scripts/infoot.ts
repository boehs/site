function ordinal(n: number) {
    var s = ["th", "st", "nd", "rd"];
    var v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

fetch(
    `{{{this.config.analytics.base}}}/api/websites/{{{this.config.analytics.id}}}/stats?` +
        new URLSearchParams({
            url: window.location.pathname,
        }),
    {
        headers: {
            "X-Umami-Share-Token": "{{{this.config.analytics.pub}}}",
        },
    },
)
    .then(
        (res) =>
            res.json() as Promise<{
                pageviews: {
                    value: number;
                };
            }>,
    )
    .then((json) => {
        document.getElementById("postlude")!.innerHTML +=
            `<hr/><p>You are the <strong>${ordinal(
                json.pageviews.value + 1,
            )}</strong> visitor to this page!</p>`;
    });
