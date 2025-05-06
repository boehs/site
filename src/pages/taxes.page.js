/**
 * a tax is defined as a collection of values, which hold a collection of pages
 * a tax may be 'tags', a value may be 'cats', and a page may be 'cats.md'
 *
 * a single tax can be nominated as a differentiator, which means pages of a different
 * tax will be grouped by the differentiator
 *
 * taxes: [tax,value]
 * taxesPaged: variation on taxes, see below
 * taxesDiffer: [tax,value, differentiator]
 * nestedTax: {tax: {value: [page]}}
 *
 * if eleventy supported double-layered pagination, all of this wouldn't be needed
 */
/** biome-ignore-all lint/complexity/useArrowFunction: 11ty */

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const collectionControl = require("../_data/collectionsControl.json");
const gardenStr = "./src/pages/garden/node/**/*.{md,csv}";

function getType(value) {
	return {}.toString
		.call(value)
		.match(/\s([a-zA-Z]+)/)[1]
		.toLowerCase();
}

export default async function* generateTaxonomy({ search }) {
	const nodes = search.glob(gardenStr);
	const taxAndValues = {}; // used for basic + paged
	const nestedTax = {}; // used for nestedTax
	const taxAndDiffer = []; // used for taxesDiffer

	const differTax = Object.entries(collectionControl).find(
		([_, val]) => val.mode === "differentiator",
	)?.[0];

	// Pass 1: Collect all necessary data
	for (const node of nodes) {
		for (const [taxonomy, control] of Object.entries(collectionControl)) {
			if (control.excludeFromPagination) continue;

			const taxData = node?.data?.[taxonomy];
			if (!taxData) continue;

			if (!nestedTax[taxonomy]) nestedTax[taxonomy] = {};

			switch (getType(taxData)) {
				case "array": {
					for (const value of taxData) {
						// Basic counting
						const key = `${taxonomy}/./${value}`;
						taxAndValues[key] = (taxAndValues[key] || 0) + 1;

						// Differ tracking
						if (!(taxonomy === differTax && value === node.data[differTax])) {
							taxAndDiffer.push([taxonomy, value, node.data[differTax]]);
						}

						// Nested
						if (!nestedTax[taxonomy][value]) nestedTax[taxonomy][value] = [];
						nestedTax[taxonomy][value].push(node);
					}
					break;
				}
				default: {
					const value = taxData;
					const key = `${taxonomy}/./${value}`;
					taxAndValues[key] = (taxAndValues[key] || 0) + 1;

					if (!(taxonomy === differTax && value === node.data[differTax])) {
						taxAndDiffer.push([taxonomy, value, node.data[differTax]]);
					}

					if (!nestedTax[taxonomy][value]) nestedTax[taxonomy][value] = [];
					nestedTax[taxonomy][value].push(node);
				}
			}
		}
	}

	// Output 1: Basic tax/value entries
	for (const key of Object.keys(taxAndValues)) {
		const [taxonomy, value] = key.split("/./");
		yield {
			layout: "pages/taxes.vto",
			tax: taxonomy,
			val: value,
		};
	}

	// Output 2: Paginated values for differentiator taxonomies
	const maxItemsPerPage = 30;
	const minItemsForLastPage = 5;

	for (const key of Object.keys(taxAndValues)) {
		const [taxonomy, value] = key.split("/./");
		let total = taxAndValues[key];
		let page = 0;
		let maxPage = Math.ceil(total / maxItemsPerPage) - 1;
		if (total % maxItemsPerPage < minItemsForLastPage) maxPage--;

		if (collectionControl[taxonomy].mode !== "differentiator") {
			yield {
				layout: "pages/taxes.vto",
				tax: taxonomy,
				val: value,
				page: 0,
				itemsInPage: total,
				hasNext: false,
				hasPrev: false,
				maxPage,
			};
			continue;
		}

		while (total > 0) {
			let itemsInPage = Math.min(total, maxItemsPerPage);
			if (
				total - itemsInPage < minItemsForLastPage &&
				total > maxItemsPerPage
			) {
				itemsInPage += total - itemsInPage;
			}
			yield {
				type: "taxesPaged",
				taxonomy,
				value,
				page,
				itemsInPage,
				hasNext: total > itemsInPage,
				hasPrev: page > 0,
				maxPage,
			};
			total -= itemsInPage;
			page++;
		}
	}

	// Output 3: Differentiator-linked tax/value/group
	const uniqueDiffer = [...new Set(taxAndDiffer.map(JSON.stringify))].map(
		JSON.parse,
	);

	for (const [taxonomy, value, differentiator] of uniqueDiffer) {
		yield {
			layout: "pages/taxesDiffer.vto",
			tax: taxonomy,
			val: value,
			differentiator,
		};
	}

	// Output 4: Nested taxonomy → value → [pages]
	for (const [taxonomy, values] of Object.entries(nestedTax)) {
		for (const [value, pages] of Object.entries(values)) {
			yield {
				layout: "pages/taxesNested.vto",
				tax: taxonomy,
				val: value,
				pages,
			};
		}
	}
}
