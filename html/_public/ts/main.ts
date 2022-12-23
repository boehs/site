console.log('is anyone out there? 🔦')

const flowerpower = '@@import _data/deets/flowerpower.txt'

let flowers: [[number?],[string?]] = [[], []], prev: string[];
flowerpower.split('\n?')
    .map((step: string,i) => {
        if (i == 0) prev = step.split('\n')
        flowers[0].push(Number(step.substring(0, 1)))
        flowers[1].push((() =>
            step.substring(1).split('\n').map((x,i2) =>
                x.replace(/[0-9]/g, match => " ".repeat(Number(match) + 2))
                .replace(/!/g,prev[i2])
            ).join('\n')
        )());
        // @ts-ignore
        prev = flowers[1][i].split('\n')
    })
// @ts-ignore
flowers = flowers.map(x => x.reverse())

let isanimating = false,
timeleft: number,
ishover = true,
state = false,
flowerElm = document.getElementById('flower')

// Hydrate via script to ensure it does not look wack for those without javascript
// @ts-ignore
flowerElm.innerHTML = flowers[1][flowers[0].length - 1]

function doanimation(should_reverse = false) {
    let flower_time = [...flowers[0]],
    flower = [...flowers[1]]
    isanimating = true;
    if (should_reverse) {
        flower_time = flower_time.reverse()
        flower = flower.reverse()
        state = false
    }
    else state = true
    let int = setInterval(() => {
        // @ts-ignore
        flowerElm.innerHTML = flower[timeleft - 1]
        if (flower_time[timeleft - 1] == 0) timeleft -= 1
        // @ts-ignore
        else flower_time[timeleft - 1] -= 1
        if (timeleft == 0) {
            clearInterval(int)
            timeleft = flower_time.length
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

timeleft = flowers[0].length

// @ts-ignore
flowerElm.onmouseover = () => {
    ishover = true
    shit()
};
// @ts-ignore
flowerElm.onmouseout = () => {
    ishover = false
    shit()
};
