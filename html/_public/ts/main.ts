console.log('is anyone out there? 🔦')

let prev = [], flowers = '@@import _data/anim/starynight.txt'.split('\n?').map((step: string, i) => {
    const frame: [number,string] = [
        Number(step.substring(0, 1)),
        // I think it's possible to remove the .replace and move it all into the .split
        // but I'm too stupid and gave up
        step.substring(1).replace(/!(?<!$)/g, '!\n').split('\n').map((x, i2) =>
            x.replace(/[0-9]/g, match => " ".repeat(Number(match) + 2))
                .replace(/!/g, prev[i2])
        ).join('\n')
    ];
    prev = frame[1].split('\n')
    return frame
}).reverse()

let isanimating = false,
    timeleft = flowers.length,
    ishover = true,
    state = false,
    flowerElm = document.getElementById('flower')

// Hydrate via script to ensure it does not look wack for those without javascript
flowerElm.innerHTML = flowers[flowers.length - 1][1]

function doanimation(should_reverse: boolean) {
    let flower = JSON.parse(JSON.stringify(flowers))
    isanimating = true;
    if (should_reverse) {
        flower = flower.reverse()
        state = false
    }
    else state = true
    let int = setInterval(() => {
        flowerElm.innerHTML = flower[timeleft - 1][1]
        if (flower[timeleft - 1][0] == 0) timeleft -= 1
        else flower[timeleft - 1][0] -= 1
        if (timeleft == 0) {
            clearInterval(int)
            timeleft = flowers.length
            isanimating = false;
            shit()
        }
    }, 200);
}

function shit() {
    if (isanimating == true) return
    if (ishover == false && state == true) doanimation(true)
    else if (ishover == true && state == false) doanimation(false)
}

flowerElm.onmouseover = () => {
    ishover = true
    shit()
};
flowerElm.onmouseout = () => {
    ishover = false
    shit()
};