import { config } from './dep.ts'

// Shared

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

// RandIs

const doings = Object.values(await Deno.readTextFile(`${config.root}/resources/is.txt`).then(res => res.split('\n')))
let isDoing = doings[Math.floor(Math.random() * doings.length)];
let doingChance = 0

export function getDoing() {
    if(doingChance > getRandomArbitrary(0,1000)) {
        isDoing = doings[Math.floor(Math.random() * doings.length)];
        doingChance = 0
    }
    doingChance++;
    return isDoing
}


// init

export function init() {
    return
}