/**
 *
 * @param {string} str
 * @returns {string}
 */
export function titleCase(str) {
	str = str
		.split(" ")
		.map((word) => {
			if (/[A-Z]/.test(word)) {
				return word;
			}
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
	// Certain minor words should be left lowercase unless
	// they are the first or last words in the string
	let lowers = [
		"A",
		"An",
		"The",
		"And",
		"But",
		"Or",
		"For",
		"Nor",
		"As",
		"At",
		"By",
		"For",
		"From",
		"In",
		"Into",
		"Near",
		"Of",
		"On",
		"Onto",
		"To",
		"With",
	];
	for (const lower of lowers)
		str = str.replace(new RegExp("\\s" + lower + "\\s", "g"), (txt) =>
			txt.toLowerCase(),
		);

	return str;
}
