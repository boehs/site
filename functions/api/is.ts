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
    "jumping for joy",
    "always learning",
    "on a journey",
    "on a roll",
    "doing flips",
    "geeking out",
    "really cool",
    "working hard",
    "setting sail",
    "high on life",
    "rocking out",
    "helping out",
    "vibing out",
    "a goofball",
    "chugging on",
    "full of life",
    "touching grass",
    "getting out there",
    "taking on challenges",
    "making new friends",
    "petting the dog"
];

export function onRequestGet(context) {
    return new Response('is ' + is[Math.floor(Math.random() * is.length)], {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
}