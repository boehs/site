# My main website!
![](https://wakapi.dev/api/badge/evan/interval:any/project:site) ![](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fboehs.org) ![](https://img.shields.io/website?url=https%3A%2F%2Fboehs.org)

This website is an `indieweb`-enabled `digital garden` with `dynamic taxonomies`, `aliases`, `gemini`, `scss`, `ts`, and lots of love.

## Some notes for developers

I like to think this website is pretty cool, I've taken great care to design
it in such a way that it is *very* flexible (although mind that the stylesheets are heavily customized)

No taxonomies, be that tags, dates, or "in" properties, are hardcoded. That does not mean nothing is hardcoded though. 11ty does hot handle taxonomies in a very good way, so this introduces dependence on `collectionsControl.json` and `tagList.json` 

## Contributing

Feel free to do whatever the fuck you want, provided you abide by the
included LICENSE.md file. This includes adding pages, squashing bugs, and
tiny improvements. It's all welcome here!

I encourage **all visitors** to submit a PR adding a line to

- `src/components/deets/greatings.txt` (Hi, Hello, Hola, etc) **or**
- `src/components/deets/isdoingstuffagain.txt` (Evan Boehs is (verb|adjective))

Be creative, everything is welcome (probably).
