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
  "never gonna give u up",
  "using his owl eyes",
  "forgetting something",
  "chasing the sun"
];

// @ts-expect-error
export async function onRequest(context): PagesFunction {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;  
  
  const response = await next()
  
  return new HTMLRewriter().on('header>span>i#needis', {
    element(element) {
      element.setInnerContent("is " + is[Math.floor(Math.random() * is.length)])
      element.removeAttribute("id")
    }
  }).transform(response)
}