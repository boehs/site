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