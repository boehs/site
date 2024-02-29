function ordinal(n: number) {
    var s = ["th", "st", "nd", "rd"];
    var v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
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
                )}</strong> visitor to this page!</p>`;
        });

    fetch("{{{this.config.donate}}}/public.json")
        .then(
            (res) =>
                res.json() as Promise<{
                    goal: {
                        amount: string;
                    };
                    npatrons: number;
                    receiving: {
                        amount: string;
                    };
                }>,
        )
        .then((json) => {
            document.querySelector("#postlude > p")!.innerHTML +=
                ` I'm <a href="{{{this.config.donate}}}" data-umami-event="donate">receiving</a> <strong>$${json.receiving.amount}</strong> per week from <strong>${json.npatrons}</strong> patrons, and my goal is <strong>$${json.goal.amount}</strong>. Feel free to <a href="/contact">contact</a> me with any questions or comments :)`;
        });
})();
