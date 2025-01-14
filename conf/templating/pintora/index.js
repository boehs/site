import pintora from "@pintora/standalone";
import { JSDOM } from "jsdom";
import "./wintercg.js";

class GlobalPatcher {
    records = {};
    set(k, v) {
        const prevValue = globalThis[k];
        this.records[k] = {
            prevValue,
            value: v,
        };

        globalThis[k] = v;
    }

    restore() {
        for (const k in this.records) {
            if (globalThis[k] === this.records[k].value) {
                globalThis[k] = this.records[k].prevValue;
            }
        }
    }
}

const patcher = new GlobalPatcher();

function createContainer() {
    const dom = new JSDOM("<!DOCTYPE html><body></body>");
    const document = dom.window.document;
    const container = document.createElement("div");
    container.id = "pintora-container";
    patcher.set("window", dom.window);
    patcher.set("document", document);
    return container;
}

export default function renderPintora(code) {
    return new Promise((resolve, reject) => {
        const container = createContainer();
        pintora.renderTo(code, {
            container,
            renderer: "svg",
            containerSize: {
                width: 600,
            },
            onRender: (renderer) => {
                const rootElement = renderer.getRootElement();
                rootElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                rootElement.classList.add("pintora");
                const html = rootElement.outerHTML;
                patcher.restore();
                resolve(html);
            },
            config: {
                core: {
                    defaultFontFamily: "'Input Mono Compressed', monospace",
                },
                themeConfig: {
                    themeVariables: {
                        primaryColor: "var(--light)",
                        canvasBackground: "transparent",
                        textColor: "var(--fg2)",
                    },
                },
                sequence: {
                    diagramPadding: 0,
                    messageFontSize: 13,
                    actorLineColor: "var(--fg2)",
                },
            },
        });
    });
}

/**
 * Replaces Pintora placeholders with rendered SVGs.
 */
export async function injectPintora(result) {
    if (result.includes("___PINTORA_")) {
        const pintoraBlocks = [];
        const regex = /___PINTORA_(\w+)_(.*?)_/gs;
        let match;
        while ((match = regex.exec(result)) !== null) {
            pintoraBlocks.push({ id: match[1], content: match[2] });
        }
        for (const block of pintoraBlocks) {
            const rendered = await renderPintora(block.content);
            result = result.replace(
                `___PINTORA_${block.id}_${block.content}_`,
                rendered,
            );
        }
    }
    return result;
}