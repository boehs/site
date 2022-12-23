const is = [
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
  "geeking out"
];
import greetings from '../html/_data/deets/greatings.json'

// @ts-expect-error
export async function onRequest(context): PagesFunction {
  // Contents of context object
  const {
    next, // used for middleware or to fetch assets
  } = context;

  const response = await next()
  const greeting = greetings[Math.floor(Math.random() * greetings.length)]
  
  return new HTMLRewriter()
    .on('header>span>i#needis', {
      element(element) {
        element.setInnerContent("is " + is[Math.floor(Math.random() * is.length)])
        element.removeAttribute("id")
      }
    })
    .on('.needstitle', {
      element(element: HTMLSpanElement) {
        element.setInnerContent(greeting.hello + " 👋")
        element.removeAttribute("class")
      }
    })
    .on('#needslang', {
      element(element: HTMLSpanElement) {
        element.setInnerContent(greeting.language)
        element.removeAttribute("id")
      }
    })
    .transform(response)
}