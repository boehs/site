function ordinal(n: number) {
    var s = ["th", "st", "nd", "rd"];
    var v = n % 100;
    return n.toLocaleString() + (s[(v - 20) % 10] || s[v] || s[0]);
}
(async () => {
    await fetch(
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
                )}</strong> visitor to this page! Your support is integral to my work. Consider donating via <strong><a href="{{{this.config.donate}}}" data-umami-event="donate" data-umami-event-place="plea">Liberapay</a></strong> or <strong><a href="https://ko-fi.com/evan" data-umami-event="donate" data-umami-event-place="plea-kofi">Ko-fi</a></strong>, or a corporate <strong><a href="/sponsor" data-umami-event="donate" data-umami-event-place="plea-sponsor">sponsorship</a></strong>. Feel free to <b><a href="/contact">contact</a></b> me with any questions or comments :)</p>`;
        });
})();
