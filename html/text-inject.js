import fs from "fs";

export default function (contents) {
  return contents.replace(
    /@@import ([a-zA-Z0-9\-_.\/]+)/g,
    function (match, filepath) {
      return JSON.stringify(
        fs.readFileSync(filepath, {
          encoding: "utf8",
        }),
      ).slice(1, -1);
    },
  );
}
