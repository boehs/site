export const is = [
    "dreaming",
    "crying over spilled milk",
    "putting out fires",
    "eating life's lemons",
    "feeling good",
    "breaking things",
    '"insane"',
    "taking risks",
    "crossing tees and dotting eyes",
    "out of bubblegum",
    "never gonna give you up",
    "using his owl eyes",
    "forgetting something",
    "chasing the sun",
    "on a roll",
    "rocking out",
    "doing flips",
    "jumping for joy",
    "always learning",
    "geeking out",
    "about the journey", // not the dest
    "really cool",
    "working hard",
    "helping out"
];

export function onRequestGet(context) {
    return new Response('is ' + is[Math.floor(Math.random() * is.length)], {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
}