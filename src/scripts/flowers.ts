import flowerpower from '../components/deets/flowerpower.txt?raw'
let flowers = [[], []]
Object.values(flowerpower.split('\n---'))
    .reverse()
    .map(x => {
        flowers[0].push(Number(x.substring(0, 1)))
        flowers[1].push(x.substring(1));
    })

let isanimating = false
let timeleft;
let ishover = true;
let state = false;
let flowerElm = document.getElementById('flower')

function doanimation(should_reverse = false, flower_time, flower) {
    isanimating = true;
    if (should_reverse) {
        flower_time = flower_time.reverse()
        flower = flower.reverse()
        state = false
    }
    else {
        flower_time = flower_time
        state = true
    }
    let int = setInterval(function () {
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
    if (ishover == false && state == true) doanimation(true, [...flowers[0]], [...flowers[1]])
    else if (ishover == true && state == false) doanimation(false, [...flowers[0]], [...flowers[1]])
    else console.log('f')
}

timeleft = flowers[0].length

// I give up
flowerElm.innerHTML = flowers[1][flowers[0].length - 1]
flowerElm.onmouseover = function () {
    ishover = true
    shit()
};
flowerElm.onmouseout = function () {
    ishover = false
    shit()
};
