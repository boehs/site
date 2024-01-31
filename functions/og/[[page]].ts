import { Resvg, ResvgRenderOptions, initWasm } from "@resvg/resvg-wasm";
import resvgwasm from "@resvg/resvg-wasm/index_bg.wasm";
import { svg } from "../../utils/ogHelpers";

function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        nbsp: " ",
        amp: "&",
        quot: '"',
        lt: "<",
        gt: ">",
    };
    return encodedString
        .replace(translate_re, function (match, entity) {
            return translate[entity];
        })
        .replace(/&#(\d+);/gi, function (match, numStr) {
            var num = parseInt(numStr, 10);
            return String.fromCharCode(num);
        });
}

export async function onRequest(context) {
    let init;
    try {
        init = initWasm(resvgwasm as WebAssembly.Module);
    } catch (error) {
        console.error("Resvg wasm not initialized");
    }

    let res = await (await fetch("/" + context.path)).text();

    let file = decodeEntities(res);
    let title = (file.match(/<title>(.*?)<\//) || [])[1];
    if (title == "missing" || title.startsWith("Redirecting to: ")) {
        return new Response(new Blob(), { status: 404 });
    }
    let date = (file.match(/dt-published">(.*?)<\//) || [])[1];
    let desc = (file.match(/name="description" content="(.*?)"/) || [])[1];
    let color = (((file.match(/<body .*?>/) || [])[0] || "").match(
        /light: (.*?)">/,
    ) || [])[1];

    const renderedSvg = await svg({ title, date, desc, color });

    await init;

    const png = new Resvg(renderedSvg, {
        font: {
            loadSystemFonts: false,
        },
    })
        .render()
        .asPng();

    return new Response(png, { status: 200 });
}
