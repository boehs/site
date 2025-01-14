import * as d3 from "d3";
import { JSDOM } from "jsdom";
import * as Plot from "@observablehq/plot";

const window = new JSDOM("<!DOCTYPE html><body>").window;

/**
 * The eval widget.
 */
export default function (value) {
    const fn = new Function("d3", "Plot", "window", value);
    return fn(d3, Plot, window);
}
