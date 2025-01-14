/**
 * In wintercg runtimes (assuming build on ci) we import our own ttf because it probably doesn't exist
 */

import { textMetrics } from "@pintora/standalone";
import { create } from "fontkit";
import { readFileSync } from "fs";
import { join } from "path";

const b = readFileSync(
    join(import.meta.dirname, "../../../../../src/_public/office.ttf"),
);
const defaultFont = create(b);
const fonts = {
    "sans-serif": defaultFont,
    "Source Code Pro": defaultFont,
};

class FontkitCalculator {
    name = "fontkit";
    getLineMetric(text, fontConfig) {
        const fontSize = fontConfig?.fontSize || 14;
        const fontName = fontConfig?.fontFamily || "sans-serif";
        const font = fonts[fontName] || defaultFont;
        const glyph = font.layout(text);
        const sizeUnit = fontSize / font.unitsPerEm;
        // const width = glyph.glyphs.reduce((last, curr) => last + curr.cbox.width, 0) * sizeUnit
        const width = glyph.bbox.width * sizeUnit; // fine

        const glyphActualMaxHeight =
            glyph.glyphs.reduce(
                (last, curr) => Math.max(last, curr.cbox.height),
                0,
            ) * sizeUnit;
        const height = glyphActualMaxHeight;

        const actualBoundingBoxAscent = height;
        // console.log('line:', text, 'width', width, 'actualBoundingBoxAscent', actualBoundingBoxAscent)
        const actualBoundingBoxDescent = 0;
        return {
            actualBoundingBoxAscent,
            actualBoundingBoxDescent,
            width,
        };
    }

    calculateTextDimensions(text, font) {
        const lines = text.split("\n");
        let width = 0;
        let height = 0;
        const fontSize = font?.fontSize || 14;
        lines.forEach((line, i) => {
            const lineMetric = this.getLineMetric(line, font);
            const w = lineMetric.width;
            width = Math.max(w, width);
            let lineHeight = fontSize;
            if ("actualBoundingBoxDescent" in lineMetric) {
                lineHeight =
                    lineMetric.actualBoundingBoxAscent +
                    lineMetric.actualBoundingBoxDescent;
            }
            height += lineHeight;
        });
        return {
            width,
            height,
        };
    }
}

textMetrics.setImpl(new FontkitCalculator());
