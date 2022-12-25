import { readdir, readFile } from "fs/promises"

(await readdir('../anim', 'utf8')).forEach(async fileName => {
    const file = await readFile(`../anim/${fileName}`,'utf8')
    const splited_file = file.split('\n?')

    let prev = Array.from({ length: splited_file[0].split('\n').length - 1 }, (_, i) => undefined)

    let newFile = splited_file.map(step => {
        const finishedSteps = step.split('\n').map((line, i) => {
            if (i == 0) return line
            if (prev[i] == line) return '!'
            else return line
        })
        prev = step.split('\n')
        return finishedSteps.join('\n').replaceAll(/!\n/g, '!')
    }).join('\n?')

    Array.from(Array(10).keys()).reverse().forEach(i => {
        newFile = newFile.replaceAll(" ".repeat(i + 2), `${i}`)
    })

    await Bun.write(`../html/_data/anim/${fileName}`, newFile)
})