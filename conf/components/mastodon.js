/**!
 * Copyright 2024 Evan Boehs
 *
 * Use of this source code is governed by an
 * MIT-style license that can be found at
 * https://opensource.org/licenses/MIT.
 */

async function embedMastodon(idOrLink) {
    let mastodonLinkOrId =
        /(?:https:\/\/)?([\w\d\-]*?.?[\w\d\-]*.[a-z]*\/@[\w\d_]*(?:@[\w\d]*?.?[\w\d]*.[a-z]*)?\/)?(\d*)/gim;

    const [fullMatch, remoteLink, id] = mastodonLinkOrId.exec(idOrLink);

    if (!fullMatch) {
        console.log(`${idOrLink} seems to be no valid Mastodon link/ID.`);
        return "";
    }

    return await createPostHTML(id, idOrLink);
}

export { embedMastodon };

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

async function createPostHTML(id, remoteLink) {
    let url = new URL(remoteLink);
    let url2 = `https://${url.host}/api/v1/statuses/${id}`;
    let res = await fetch(url2);

    if (res.status !== 200) {
        return "";
    }

    let data = await res.json();

    return `<article class="mastodon-embed">
        <div style="display: flex; align-items: center; gap: 20px">
            <img src="${
                data.account.avatar
            }" style="width: 52px; height: 52px"/>
            <div style="display: flex; flex-direction: column; justify-content: center">
                <strong><a href="${data.url}">${
                    data.account.display_name
                }</a></strong>
                <sup>@${data.account.username}@${url.host}</sup>
            </div>
        </div>
        <p>${data.content}</p>
        <div style="display: flex; justify-content: space-between">
            <sup>${parseTimestamp(data.created_at)}</sup>
            <sup>${data.reblogs_count} retoots</sup>
        </div>
    </article>`;
}
