import * as d3 from "d3";
import { JSDOM } from "jsdom";
import * as Plot from "@observablehq/plot";
import { join } from "path";
import { readFileSync } from "fs";

let basePath = "../../../../../src/pages/garden/node/";

function readFile(path) {
    return readFileSync(join(import.meta.dirname + basePath, path));
}

const h = {
    read: {
        csv: (path) => {
            let inputContent = readFile(path).toString();
            if (inputContent.startsWith("---")) {
                let split = inputContent.split("\n---\n", 2);
                inputContent = split[1];
            }
            if (inputContent.endsWith("---")) {
                let split = inputContent.split("\n---\n", 2);
                inputContent = split[0];
            }
            return d3.csvParse(inputContent);
        },
        file: (path) => readFile(path),
        string: (path) => readFile(path).toString(),
    },
};

const window = new JSDOM("<!DOCTYPE html><body>").window;

/**
 * The eval widget.
 */
export default function (value) {
    const fn = new Function("window", "d3", "Plot", "h", value);
    return fn(window, d3, Plot, h);
}
