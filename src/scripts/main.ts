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

async function run(e, url) {
    e.preventDefault();
    let res = await (await fetch(url + "?spa")).json();
    mergeHead(new DOMParser().parseFromString(res.head, "text/html"));
    document.body.setAttribute("style", res.color);
    let main = document.querySelector("main");
    main.innerHTML = res.main;
    spa(main.querySelectorAll("a"));
}

function spa(links) {
    Array.from(links)
        .filter(
            (node) =>
                node.href.includes(document.location.origin) && // on origin url
                !node.href.includes("#") && // not an id anchor
                node.href !==
                    (document.location.href || document.location.href + "/"), // not current page
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
                if (!window.history.state || window.history.state.url !== url) {
                    window.history.pushState({ url }, "internalLink", url);
                }
                run(e, url);
            });
        });
    window.addEventListener("popstate", (e) => {
        run(e, window.location.href);
    });
}

function mergeHead(nextDoc) {
    // Update head
    // Head elements that changed on next document
    const getValidNodes = (doc) => Array.from(doc.head.querySelectorAll("*"));
    const oldNodes = getValidNodes(document);
    const nextNodes = getValidNodes(nextDoc);
    const { staleNodes, freshNodes } = partitionNodes(oldNodes, nextNodes);

    staleNodes.forEach((node) => node.remove());

    document.head.append(...freshNodes);
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
