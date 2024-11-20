// read node_modules/vento/vento.js

import { VentoPlugin } from "eleventy-plugin-vento";
import vento from "ventojs";

export default function ventoCfg(eleventyConfig) {
    const env = vento({
        autoDataVarname: true,
        autoescape: true,
    });

    eleventyConfig.addShortcode("interpolate", function (str) {
        return env.runStringSync(str, this).content;
    });

    eleventyConfig.addPlugin(VentoPlugin, {});
}
