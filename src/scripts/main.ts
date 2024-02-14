console.log("is anyone out there? 🔦");

let prev = [],
    flowers = "@@import _data/anim/starynight.txt"
        .split("\n?")
        .map((step: string) => {
            const frame: [number, string] = [
                Number(step.substring(0, 1)),
                // I think it's possible to remove the .replace and move it all into the .split
                // but I'm too stupid and gave up
                step
                    .substring(1)
                    .replace(/!(?<!$)/g, "!\n")
                    .split("\n")
                    .map((x, i2) =>
                        x
                            .replace(/[0-9]/g, (match) =>
                                " ".repeat(Number(match) + 2),
                            )
                            .replace(/!/g, prev[i2]),
                    )
                    .join("\n"),
            ];
            prev = frame[1].split("\n");
            return frame;
        })
        .reverse();

let isanimating = false,
    timeleft = flowers.length,
    ishover: boolean,
    state = false,
    flowerElm = document.getElementById("flower");

// Hydrate via script to ensure it does not look wack for those without javascript
flowerElm.innerHTML = flowers[flowers.length - 1][1];

function doanimation(should_reverse: boolean) {
    let flower = JSON.parse(JSON.stringify(flowers));
    isanimating = true;
    if (should_reverse) {
        flower = flower.reverse();
        state = false;
    } else state = true;
    let int = setInterval(() => {
        flowerElm.innerHTML = flower[timeleft - 1][1];
        if (flower[timeleft - 1][0] == 0) timeleft -= 1;
        else flower[timeleft - 1][0] -= 1;
        if (timeleft == 0) {
            clearInterval(int);
            timeleft = flowers.length;
            isanimating = false;
            shit();
        }
    }, 200);
}

function shit() {
    if (isanimating == true) return;
    if (ishover == false && state == true) doanimation(true);
    else if (ishover == true && state == false) doanimation(false);
}

flowerElm.onmouseover = () => {
    ishover = true;
    shit();
};
flowerElm.onmouseout = () => {
    ishover = false;
    shit();
};

const is = document.getElementById("is");
if (is)
    is.onclick = async (e) =>
        ((e.target as HTMLElement).textContent = await fetch("/api/is").then(
            (r) => r.text(),
        ));

// This SPA code is derived from flamethrower

let cantViewTransition = !document.startViewTransition;

async function _run(e, url) {
    let res = new DOMParser().parseFromString(
        await (await fetch(url + "?spa")).text(),
        "text/html",
    );
    document.body.setAttribute("style", res.body.getAttribute("style"));
    let main = document.querySelector("main");
    main.innerHTML = res.querySelector("main").innerHTML;
    document.querySelector("i").replaceWith(res.querySelector("i"));
    spa(main.querySelectorAll("a"));
    mergeHead(res);
}

async function run(e, url, isBack) {
    e.preventDefault();
    if (cantViewTransition) {
        await _run(e, url);
        return;
    }
    if (isBack) {
        document.documentElement.classList.add("back-transition");
    }
    const transition = document.startViewTransition(() => _run(e, url));
    try {
        await transition.finished;
    } finally {
        document.documentElement.classList.remove("back-transition");
        window.umami &&
            window.umami.track((w) => {
                return {
                    ...w,
                    url: window.location.pathname,
                };
            });
    }
}

function spa(links) {
    if (cantViewTransition) {
        Array.from(links)
            .filter(
                (node) =>
                    node.href.includes(document.location.origin) && // on origin url
                    !node.href.includes("#") && // not an id anchor
                    node.href !==
                        (document.location.href ||
                            document.location.href + "/"), // not current page
            )
            .forEach((node) => {
                const url = node.getAttribute("href");
                /*node.addEventListener(
                "pointerdown",
                () => {
                    const linkEl = document.createElement("link");
                    linkEl.rel = "prefetch";
                    linkEl.href = url + "?spa";
                    //linkEl.as = "document";
                    document.head.appendChild(linkEl);
                },
                {
                    once: true,
                },
            );*/
                node.addEventListener("click", (e) => {
                    if (
                        !window.history.state ||
                        window.history.state.url !== url
                    ) {
                        window.history.pushState({ url }, "internalLink", url);
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    run(e, url, false);
                });
            });
    }
}

function mergeHead(nextDoc) {
    // Update head
    // Head elements that changed on next document
    const getValidNodes = (doc) => Array.from(doc.head.querySelectorAll("*"));
    const oldNodes = getValidNodes(document);
    const nextNodes = getValidNodes(nextDoc);
    const { staleNodes, freshNodes } = partitionNodes(oldNodes, nextNodes);
    staleNodes.forEach((node) => node.remove());
    freshNodes.forEach((node) => {
        // Per the spec, DOMParser scripts are not executable
        // https://www.w3.org/TR/2011/WD-html5-20110405/scripting-1.html#script-processing-noscript
        if (node.tagName == "SCRIPT") {
            node = document
                .createRange()
                .createContextualFragment(node.outerHTML);
        }
        document.head.appendChild(node);
    });
}

function partitionNodes(oldNodes, nextNodes) {
    const staleNodes = [];
    const freshNodes = [];
    let oldMark = 0;
    let nextMark = 0;
    while (oldMark < oldNodes.length || nextMark < nextNodes.length) {
        const old = oldNodes[oldMark];
        const next = nextNodes[nextMark];
        if (old?.isEqualNode(next)) {
            oldMark++;
            nextMark++;
            continue;
        }
        const oldInFresh = old
            ? freshNodes.findIndex((node) => node.isEqualNode(old))
            : -1;
        if (oldInFresh !== -1) {
            freshNodes.splice(oldInFresh, 1);
            oldMark++;
            continue;
        }
        const nextInStale = next
            ? staleNodes.findIndex((node) => node.isEqualNode(next))
            : -1;
        if (nextInStale !== -1) {
            staleNodes.splice(nextInStale, 1);
            nextMark++;
            continue;
        }
        old && staleNodes.push(old);
        next && freshNodes.push(next);
        oldMark++;
        nextMark++;
    }

    return { staleNodes, freshNodes };
}

spa(document.links);

function isBackNavigation(navigateEvent) {
    if (
        navigateEvent.navigationType === "push" ||
        navigateEvent.navigationType === "replace"
    ) {
        return false;
    }
    if (
        navigateEvent.destination.index !== -1 &&
        navigateEvent.destination.index < navigation.currentEntry.index
    ) {
        return true;
    }
    return false;
}

if (cantViewTransition) {
    window.addEventListener("popstate", (e) => {
        run(e, window.location.href, false);
    });
} else {
    navigation.addEventListener("navigate", (event) => {
        const toUrl = new URL(event.destination.url);

        if (location.origin !== toUrl.origin) return;
        if (location.pathname == toUrl.pathname) return;
        // don't run on links to other files
        if (toUrl.pathname.match(/\.([^\./\?]+)($|\?)/)) return;
        if (event.info === "ignore") return;

        const isBack = isBackNavigation(event);
        event.intercept({
            async handler() {
                await run(event, toUrl, isBack);
                if (event.navigationType == "push") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            },
        });
    });
}
