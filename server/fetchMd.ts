import { Markdown } from './dep.ts'
const decoder = new TextDecoder("utf-8");

export default async function render(filename: string) {
    return Markdown.parse(decoder.decode(await Deno.readFile(`${filename}.md`)))
}