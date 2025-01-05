/**!
 * Copyright 2024 Evan Boehs
 *
 * Use of this source code is governed by an
 * MIT-style license that can be found at
 * https://opensource.org/licenses/MIT.
 */

import { embedMastodon } from "./mastodon.js";
import { embedBluesky } from "./bsky.js";

export { embedMastodon, embedBluesky };

function parseTimestamp(dateString) {
    return new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date(dateString));
}

const REBLOG_VERB = {
    mastodon: "retoots",
    bluesky: "reposts",
};

export function createPostHTML(data, mode) {
    return `<article class="mastodon-embed">
        <div style="display: flex; align-items: center; gap: 20px">
            <img src="${
                data.account.avatar
            }" style="width: 52px; height: 52px"/>
            <div style="display: flex; flex-direction: column; justify-content: center">
                <strong><a href="${data.url}">${
                    data.account.display_name
                }</a></strong>
                <sup>@${data.account.username}</sup>
            </div>
        </div>
        <p>${data.content}</p>
        <div style="display: flex; justify-content: space-between">
            <sup>${parseTimestamp(data.created_at)}</sup>
            <sup>${data.reblogs_count} ${REBLOG_VERB[mode]}</sup>
        </div>
    </article>`;
}
