import { is } from './api/is';
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
    .on('i#is', {
      element(element) {
        element.setInnerContent("is " + is[Math.floor(Math.random() * is.length)])
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
        
        if (greeting.about) {
          element.tagName = 'a'
          element.setAttribute('title', 'teach me something new!')
          element.setAttribute('href',greeting.about)
        }
      }
    })
    .transform(response)
}