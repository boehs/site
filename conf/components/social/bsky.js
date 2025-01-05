/**!
 * Copyright 2024 Evan Boehs
 *
 * Use of this source code is governed by an
 * MIT-style license that can be found at
 * https://opensource.org/licenses/MIT.
 */

import eleventyFetch from "@11ty/eleventy-fetch";
import { createPostHTML } from "./social.js";

// ex: at://did:plc:a1b2c3d4/app.bsky.feed.post/z9y8x7w6
async function embedBluesky(id) {
    let fetchURL = `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${encodeURIComponent(
        id,
    )}&depth=0&parentHeight=0`;
    let res = await eleventyFetch(fetchURL, {
        type: "json",
        duration: "1w",
        returnType: "response",
    });

    if (res.status !== 200) {
        return "";
    }
    let dataTemp = res.body.thread.post;
    let data = {
        account: {
            display_name: dataTemp.author.displayName,
            username: dataTemp.author.handle,
            avatar: dataTemp.author.avatar,
        },
        content: dataTemp.record.text,
        created_at: dataTemp.record.createdAt,
        reblogs_count: dataTemp.repostCount,
    };
    return createPostHTML(data, "bluesky");
}

export { embedBluesky };
