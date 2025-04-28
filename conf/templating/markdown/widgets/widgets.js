import renderPintora from "./pintora/index.js";
import exec from "./eval.js";

const widgets = {
	PINTORA: renderPintora,
	EVAL: exec,
};

export async function inject(result) {
	let foundWidgets = [];
	const regex = /___(\w{4,})_(\w+)_(.*?)___/gs;
	let match;
	while ((match = regex.exec(result)) !== null) {
		foundWidgets.push({
			mode: match[1],
			id: match[2],
			content: match[3],
		});
	}
	for (const block of foundWidgets) {
		let map = widgets[block.mode];
		if (!map) {
			console.error(`Unknown widget type: ${block.mode}`);
			continue;
		}
		const rendered = await map(block.content);
		result = result.replace(
			`___${block.mode}_${block.id}_${block.content}___`,
			rendered,
		);
	}
	return result;
}
