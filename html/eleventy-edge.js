import { EleventyEdge } from "eleventy:edge";
import precompiledAppData from "./_generated/eleventy-edge-app-data.js";

export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });

    edge.config((eleventyConfig) => {
      // Add some custom Edge-specific configuration
      // e.g. Fancier json output
      // eleventyConfig.addFilter("json", obj => JSON.stringify(obj, null, 2));
      const is = [
        "dreaming",
        "crying over spilled milk",
        "putting out fires",
        "eating life's lemons",
        "feeling good",
        "breaking things",
        '"insane"',
        "taking big risks",
        "crossing tees and dotting eyes",
        "out of bubblegum",
        "never gonna give u up"
      ];
      eleventyConfig.addFilter("rIs", function (_) {
        return is[Math.floor(Math.random() * is.length)];
      });
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
