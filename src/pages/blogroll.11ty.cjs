const EleventyFetch = require("@11ty/eleventy-fetch");

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

class Blogroll {
    data() {
        return {
            permalink: "blogroll.html",
            title: "Blogroll",
            is: "blogging about bloggers!!",
            description: "The blogs I read",
        };
    }

    async render({ config }) {
        if (
            !(
                config.blogroll &&
                config.blogroll.base &&
                process.env.FLX_AUTH_TOKEN
            )
        )
            return "<p>This website does not have a blogroll.</p>";
        try {
            let url = config.blogroll.base + "/v1/feeds";

            const content = await EleventyFetch(url, {
                duration: "1d",
                type: "json",
                fetchOptions: {
                    headers: {
                        "X-Auth-Token": process.env.FLX_AUTH_TOKEN,
                    },
                },
            });

            let obj = {};
            shuffleArray(content);
            content.forEach((item) => {
                if (obj[item.category.title] == undefined)
                    obj[item.category.title] = [];
                obj[item.category.title].push([item.title, item.site_url]);
            });

            let res = Object.entries(obj)
                .map(
                    ([k, v]) =>
                        `<h2>${k}</h2><ul>${v
                            .map(
                                (v) =>
                                    `<li><a href="${
                                        v[1]
                                    }" style="--url: url('https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(
                                        v[1],
                                    )}')">${v[0]}</a></li>`,
                            )
                            .join("")}</ul>`,
                )
                .join("");
            res =
                `<p>Hi!! Welcome to my blogroll! These are the blogs I read, presented in a completely random order (that will change, randomly, from time to time).</p>` +
                (config.blogroll.pins
                    ? `<p>You should also check out my <a data-umami-event="pins" href="${config.blogroll.pins}">&#8220;pins&#8221;</a> and <a data-umami-event="links" href="/in/links">monthly links</a>, where I collect interesting content from around the web!</p>`
                    : "") +
                res +
                "<p>Thank you for stopping by! If you know of more great blogs, please do tell &lt;3</p>";
            return res;
        } catch (e) {
            return {
                // my failure fallback data
            };
        }
    }
}

module.exports = Blogroll;
