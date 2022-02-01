import { config } from '../../dep.ts'

const greet = JSON.parse(await Deno.readTextFile(`${config.root}/resources/greet.json`))
export default function() {
    return greet[Math.floor(Math.random() * greet.length)]
}