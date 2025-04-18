import satori from "satori";
import { readFile } from "node:fs/promises";
import config from "../src/_data/config.json" with { type: "json" };

export async function loadFonts() {
	const [base, italic, bold, office] = await Promise.all([
		readFile(`./src/_public/${config.font.regular}.woff`),
		readFile(`./src/_public/${config.font.italic}.woff`),
		readFile(`./src/_public/${config.font.bold}.woff`),
		readFile("./src/_public/office.ttf"),
	]);

	return [
		{
			name: config.font.regular.split(".")[0],
			data: base,
			weight: 400,
			style: "normal",
		},
		{
			name: config.font.italic.split(".")[0],
			data: italic,
			weight: 400,
			style: "italic",
		},
		{
			name: config.font.bold.split(".")[0],
			data: bold,
			weight: 700,
			style: "normal",
		},
		{
			name: "monospace",
			data: office,
			weight: 700,
			style: "normal",
		},
	];
}

const fonts = await loadFonts();

export const svg = async ({ title, date, desc, color = "#3C898B" }) => {
	return await satori(
		// @ts-ignore
		{
			type: "div",
			props: {
				style: {
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "space-between",
					color: "#101010",
					backgroundColor: "hsl(20, 100%, 98%)",
					padding: "48px",
					fontSize: "40px",
					fontFamily: config.font.bold.split(".")[0],
				},
				children: [
					{
						type: "pre",
						props: {
							style: {
								position: "absolute",
								right: "30px",
								bottom: "-18px",
								marginBottom: "0px",
								fontSize: "32px",
								fontWeight: "bolder",
								color,
								opacity: "0.25",
								fontFamily: "monospace",
							},
							children:
								".            +                /`\\     x     (         /`\\\n    x                  /`\\   // \\\\          ))   *   // \\\\\n          *     .     // \\\\  // \\\\  /`\\_____||       // \\\\\n                      // \\\\  // \\\\ // /       \\  /`\\ // \\\\\n.        +            // \\\\  // \\\\ ///_________\\// \\\\// \\\\\n                      // \\\\  // \\\\ // |-[+]---| // \\\\// \\\\\n                      // \\\\  // \\\\ // |-------| // \\\\// \\\\\n          _____,....-----'------'-----''-------'---'----'--\n        ",
						},
					},
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								flexDirection: "column",
							},
							children: [
								{
									type: "h1",
									props: {
										style: {
											fontSize: "48px",
											marginTop: 0,
											marginBottom: "5px",
											fontWeight: "bold",
										},
										children: title,
									},
								},
								{
									type: "em",
									props: {
										style: {
											margin: 0,
											color: "#878482",
										},
										children: desc,
									},
								},
							],
						},
					},
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								flexDirection: "column",
							},
							children: [
								{
									type: "p",
									props: {
										style: {
											margin: 0,
											fontSize: "32px",
											marginBottom: "5px",
											color: "#878482",
										},
										children: date,
									},
								},
								{
									type: "strong",
									props: {
										style: {
											color,
										},
										children: "Evan Boehs",
									},
								},
							],
						},
					},
				],
			},
		},
		{
			fonts,
			height: 630,
			width: 1200,
		},
	);
};
