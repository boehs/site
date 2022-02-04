const file: string = await Deno.readTextFile('../src/components/deets/og_flowerpower.txt')
const splited_file = file.split('\n?')

let prev = Array.from({length: splited_file[0].split('\n').length - 1}, (_, i) => undefined)

const newFile = splited_file.map(step => {

    const finishedSteps = step.split('\n').map((line,i) => {
        if (i == 0) return line
        if (prev[i] == line) return '!'
        else return line
    })
    prev = finishedSteps
    return finishedSteps.join('\n')
}).join('\n?')

await Deno.writeTextFile('../src/components/deets/flowerpower.txt',newFile)