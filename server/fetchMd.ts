import { Markdown } from './dep.ts'
const decoder = new TextDecoder("utf-8");

export async function render(filename: string) {
    return Markdown.parse(decoder.decode(await Deno.readFile(`${filename}`)))
}

export default async function renderAndInfo(path: string) {
    const md = await render(path)
    const stats = await Deno.stat(path)
    return { ...md, ...stats }
}