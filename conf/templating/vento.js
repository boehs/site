// read node_modules/vento/vento.js

import { VentoPlugin } from "eleventy-plugin-vento";

async function hash(message, algo = "SHA-1") {
    return Array.from(
        new Uint8Array(
            await crypto.subtle.digest(algo, new TextEncoder().encode(message)),
        ),
        (byte) => byte.toString(16).padStart(2, "0"),
    ).join("");
}

export default function ventoCfg(eleventyConfig) {
    eleventyConfig.addPlugin(VentoPlugin, {
        plugins: [
            (env) => {
                env.filters.exec = async function (code) {
                    const file = `memory:${await hash(code)}.vto`;
                    let res = (await env.runString(code, this.data, file))
                        .content;
                    return res;
                };
            },
        ],
    });
}
