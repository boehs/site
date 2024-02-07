import { readdir, readFile, writeFile } from "fs/promises";

(await readdir("./anim", "utf8")).forEach(async (path) => {
    const file = (await readFile(`./anim/${path}`, "utf8")).split("\n?");

    let _prev = Array.from(
        { length: file[0].split("\n").length - 1 },
        (_, i) => undefined,
    );

    let _new = file
        .map((step) => {
            const finishedSteps = step.split("\n").map((line, i) => {
                if (i == 0) return line;
                if (_prev[i] == line) return "!";
                else return line;
            });
            _prev = step.split("\n");
            return finishedSteps.join("\n").replaceAll(/!\n/g, "!");
        })
        .join("\n?");

    Array.from(Array(10).keys())
        .reverse()
        .forEach((i) => {
            _new = _new.replaceAll(" ".repeat(i + 2), `${i}`);
        });

    await writeFile(`./src/_data/anim/${path}`, _new);
});
