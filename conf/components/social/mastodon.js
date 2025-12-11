/**!
 * Copyright 2024 Evan Boehs
 *
 * Use of this source code is governed by an
 * MIT-style license that can be found at
 * https://opensource.org/licenses/MIT.
 */

import eleventyFetch from "@11ty/eleventy-fetch";
import { createPostHTML } from "./social.js";

async function embedMastodon(idOrLink) {
	let mastodonLinkOrId =
		/(?:https:\/\/)?([\w\d\-]*?.?[\w\d\-]*.[a-z]*\/@[\w\d_]*(?:@[\w\d]*?.?[\w\d]*.[a-z]*)?\/)?(\d*)/gim;

	const [fullMatch, remoteLink, id] = mastodonLinkOrId.exec(idOrLink);

	if (!fullMatch) {
		console.log(`${idOrLink} seems to be no valid Mastodon link/ID.`);
		return "";
	}

	let url = new URL("https://" + remoteLink);
	let url2 = `https://${url.host}/api/v1/statuses/${id}`;
	let res = await eleventyFetch(url2, {
		type: "json",
		duration: "1w",
		returnType: "response",
	});

	if (res.status !== 200) {
		return "";
	}

	if (!res.body.account.username.includes("@"))
		res.body.account.username += `@${url.host}`;

	return createPostHTML(res.body, "mastodon");
}

export { embedMastodon };
