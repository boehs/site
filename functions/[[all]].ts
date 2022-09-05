const is = [
  "dreaming",
  "crying over spilled milk",
  "putting out fires",
  "eating life's lemons",
  "feeling good",
  "breaking things",
  '"insane"',
  "taking big risks",
  "crossing tees and dotting eyes",
  "out of bubblegum",
  "never gonna give you up",
  "using his owl eyes",
  "forgetting something",
  "chasing the sun",
  "on a roll",
];

// @ts-expect-error
export async function onRequest(context): PagesFunction {
  // Contents of context object
  const {
    next, // used for middleware or to fetch assets
  } = context;  
  
  const response = await next()
  
  return new HTMLRewriter().on('header>span>i#needis', {
    element(element) {
      element.setInnerContent("is " + is[Math.floor(Math.random() * is.length)])
      element.removeAttribute("id")
    }
  }).transform(response)
}