import fs from "fs";
import path from "path";

export default function (contents) {
    return contents.replace(
        /@@import ([a-zA-Z0-9\-_.\/]+)/g,
        function (match, filepath) {
            return JSON.stringify(
                fs.readFileSync(path.join("./src", filepath), {
                    encoding: "utf8",
                }),
            ).slice(1, -1);
        },
    );
}
