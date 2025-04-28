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

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const collectionControl = require("../../src/_data/collectionsControl.json");
const gardenStr = "./src/pages/garden/node/**/*.{md,csv}";

// this is typeof on drugs
function getType(value) {
	return {}.toString
		.call(value)
		.match(/\s([a-zA-Z]+)/)[1]
		.toLowerCase();
}

function standard(collectionApi) {
	// lets make a variable to hold our taxonomies and values
	const taxAndValues = {};
	// We need to get each post in our posts folder. In my case this is /node
	const nodes = collectionApi.getFilteredByGlob(gardenStr);
	// next lets iterate over all the nodes
	for (const node of nodes) {
		// and then iterate over the taxonomies
		for (const [taxonomy, value] of Object.entries(collectionControl)) {
			// I don't want to paginate date, for instance
			// this is why my collectionControl is using objects instead of arrays
			// @ts-expect-error
			if (value.excludeFromPagination) continue;
			if (node?.data?.[taxonomy]) {
				switch (getType(node.data[taxonomy])) {
					// if it is an array (for tags especially)
					case "array":
						for (const item of node.data[taxonomy]) {
							if (!taxAndValues[`${taxonomy}/./${item}`])
								taxAndValues[`${taxonomy}/./${item}`] = 0;
							taxAndValues[`${taxonomy}/./${item}`] += 1;
						}
						break;
					// otherwise
					default:
						if (!taxAndValues[`${taxonomy}/./${node.data[taxonomy]}`])
							taxAndValues[`${taxonomy}/./${node.data[taxonomy]}`] = 0;
						taxAndValues[`${taxonomy}/./${node.data[taxonomy]}`] += 1;
				}
			}
		}
	}
	return taxAndValues;
}

/** @param {import("@11ty/eleventy/UserConfig").default} eleventyConfig */
export function taxes(eleventyConfig) {
	// biome-ignore lint/complexity/useArrowFunction: <explanation>
	eleventyConfig.addCollection("taxes", function (collectionApi) {
		const taxAndValues = standard(collectionApi);

		// @ts-ignore
		const unique = Object.keys(taxAndValues).map((key) => {
			const [taxonomy, value] = key.split("/./");
			return [taxonomy, value];
		});

		return unique;
	});

	/**
	 * The goal of this is to paginate taxes with the following rules:
	 * - if it isn't a differentiator, it should not be paginated
	 *   practically, this means only in: blog, garden, ... is paginated
	 * - 30 items per page
	 * - if the last page has less than 5 items, it should be merged with the previous page
	 */
	// biome-ignore lint/complexity/useArrowFunction: <explanation>
	eleventyConfig.addCollection("taxesPaged", function (collectionApi) {
		const taxAndValues = standard(collectionApi);

		const paginatedResults = [];
		const maxItemsPerPage = 30;
		const minItemsForLastPage = 5;

		for (const key of Object.keys(taxAndValues)) {
			const [taxonomy, value] = key.split("/./");
			let totalItems = taxAndValues[key];
			let pageNumber = 0;
			let maxPage = Math.ceil(totalItems / maxItemsPerPage) - 1;
			if (totalItems % maxItemsPerPage < minItemsForLastPage) {
				maxPage--;
			}
			if (collectionControl[taxonomy].mode !== "differentiator") {
				paginatedResults.push({
					t: taxonomy,
					v: value,
					n: pageNumber,
					itemsInPage: totalItems,
					hasNext: false,
					hasPrev: false,
					maxPage,
				});
				continue;
			}

			while (totalItems > 0) {
				let itemsInPage = Math.min(totalItems, maxItemsPerPage);

				if (
					totalItems - itemsInPage < minItemsForLastPage &&
					totalItems > maxItemsPerPage
				) {
					itemsInPage += totalItems - itemsInPage;
				}

				paginatedResults.push({
					t: taxonomy,
					v: value,
					n: pageNumber,
					itemsInPage: itemsInPage,
					hasNext: totalItems > itemsInPage,
					hasPrev: pageNumber > 0,
					maxPage,
				});

				totalItems -= itemsInPage;
				pageNumber++;
			}
		}

		return paginatedResults;
	});

	// biome-ignore lint/complexity/useArrowFunction: <explanation>
	eleventyConfig.addCollection("taxesDiffer", function (collectionApi) {
		const taxAndValues = [];
		const nodes = collectionApi.getFilteredByGlob(gardenStr);
		const differ =
			Object.keys(collectionControl)[
				Object.values(collectionControl).findIndex(
					// @ts-expect-error
					(value) => value.mode === "differentiator",
				)
			];
		for (const node of nodes) {
			for (const [taxonomy, value] of Object.entries(collectionControl)) {
				// @ts-ignore
				if (value.excludeFromPagination) continue;
				if (node?.data?.[taxonomy]) {
					switch (getType(node.data[taxonomy])) {
						case "array": {
							for (const item of node.data[taxonomy]) {
								if (!(taxonomy === differ && item === node.data[differ]))
									taxAndValues.push([taxonomy, item, node.data[differ]]);
							}
							break;
						}
						default:
							if (
								!(
									taxonomy == differ && node.data[taxonomy] == node.data[differ]
								)
							)
								taxAndValues.push([
									taxonomy,
									node.data[taxonomy],
									node.data[differ],
								]);
					}
				}
			}
		}

		// custom set, sets don't work with objects
		// @ts-ignore
		const unique = [...new Set(taxAndValues.map(JSON.stringify))].map(
			// @ts-ignore
			JSON.parse,
		);

		return unique;
	});

	// biome-ignore lint/complexity/useArrowFunction: <explanation>
	eleventyConfig.addCollection("nestedTax", function (collectionApi) {
		const nestedTax = {};
		const nodes = collectionApi.getFilteredByGlob(gardenStr);
		for (const node of nodes) {
			for (const [taxonomy, value] of Object.entries(collectionControl)) {
				const taxValue = node.data[taxonomy];

				// @ts-expect-error
				if (value.excludeFromPagination) continue;
				if (node?.data?.[taxonomy]) {
					if (!nestedTax[taxonomy]) nestedTax[taxonomy] = {};
					switch (getType(taxValue)) {
						case "array": {
							for (const item of taxValue) {
								// if the value in the object does not yet exist
								if (!nestedTax[taxonomy][item]) nestedTax[taxonomy][item] = [];
								// then add the entire page to it
								nestedTax[taxonomy][item].push(node);
							}
							break;
						}
						// otherwise
						default: {
							// if the value in the object does not yet exist
							if (!nestedTax[taxonomy][taxValue])
								nestedTax[taxonomy][taxValue] = [];
							// then add the entire page to it
							nestedTax[taxonomy][taxValue].push(node);
						}
					}
				}
			}
		}

		return nestedTax;
	});
}
