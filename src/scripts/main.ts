console.log('is anyone out there? 🔦')

import flowerpower from '../components/deets/flowerpower.txt?raw'
let flowers: [[number],[string]] = [[], []], prev
Object.values(flowerpower.split('\n?'))
    .map((step: string,i) => {
        if (i == 0) prev = step.split('\n')
        flowers[0].push(Number(step.substring(0, 1)))
        flowers[1].push((() => {
            return step.substring(1).split('\n').map((x,i2) => {
                if (x == '!') return prev[i2]
                else return x
            }).join('\n')
        })());
        prev = flowers[1][i].split('\n')
    })
flowers = flowers.map(x => x.reverse())

let isanimating = false
let timeleft;
let ishover = true;
let state = false;
let flowerElm = document.getElementById('flower')

function doanimation(should_reverse = false) {
    let flower_time = [...flowers[0]]
    let flower = [...flowers[1]]
    isanimating = true;
    if (should_reverse) {
        flower_time = flower_time.reverse()
        flower = flower.reverse()
        state = false
    }
    else state = true
    let int = setInterval(() => {
        flowerElm.innerHTML = flower[timeleft - 1]
        if (flower_time[timeleft - 1] == 0) timeleft -= 1
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

// Hydrate via script to ensure it does not look wierd for those without javascript
flowerElm.innerHTML = flowers[1][flowers[0].length - 1]
flowerElm.onmouseover = () => {
    ishover = true
    shit()
};
flowerElm.onmouseout = () => {
    ishover = false
    shit()
};
