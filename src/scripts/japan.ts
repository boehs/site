const SHADES_OF_GREEN = [
	// Pink
	["#ec275f", "#f25477", "#ffa7a6", "#ffdcdc", "#d4e0ee"],
	// Green
	["#3CB371", "#8A9A5B", "#3EB489", "#00AD83", "#01796F", "#1DB954", "#00674b"],
	// Brown
	["#d4e09b", "#f6f4d2", "#cbdfbd", "#f19c79"],
];
const SHADES_OF_BROWN = ["sienna", "brown", "saddlebrown"];

const SCALE_FACTOR = 2.5;
// Really can be 2x this value
const MAX_LEAF_RADIUS = 8 * SCALE_FACTOR;
const MAX_LEAF_DISTANCE = 25 * SCALE_FACTOR;

function gaussianRandom(mean = 0, stdev = 1) {
	let u = 1 - Math.random();
	let v = Math.random();
	let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
	return z * stdev + mean;
}

let trees = document.querySelector(".trees")!;

const diff = (a, b) => (a > b ? a - b : b - a);

const shuffle = <T>(arr: T[]) =>
	arr
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);

const randSign = () => (Math.random() < 0.5 ? -1 : 1);
const randArr = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

type Sizes = {
	min: { x: number; y: number };
	max: { x: number; y: number };
};

class Leaf {
	#x: number;
	#y: number;
	#color: string;
	#rotation: number;
	#radius: number;

	constructor(x: number, y: number, color: string, sizes: Sizes) {
		this.#x = x + Math.random() * MAX_LEAF_DISTANCE - 25 * SCALE_FACTOR;
		this.#y = y + (Math.random() - 0.5) * 50 * SCALE_FACTOR;
		this.#color = color;
		this.#rotation = Math.random() * 360;
		this.#radius = MAX_LEAF_RADIUS + Math.random() * MAX_LEAF_RADIUS;

		amendBindingBox(this.#x, this.#y, sizes);
	}

	grow(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.translate(this.#x, this.#y);
		ctx.rotate(this.#rotation);
		ctx.beginPath();
		const radiusY = this.#radius >> 1;
		ctx.ellipse(radiusY, radiusY >> 1, this.#radius, radiusY, 0, 0, Math.PI * 2);
		ctx.fillStyle = this.#color;
		ctx.fill();
		ctx.restore();
	}
}

/**
 * Get cords from starting point, length, and angle
 */
function atAngle(
	x: number,
	y: number,
	length: number,
	angle: number,
): [number, number] {
	const rad = angle * (Math.PI / 180);
	return [x + length * Math.cos(rad), y + length * Math.sin(rad)];
}

function amendBindingBox(x: number, y: number, sizes: Sizes) {
	if (x < sizes.min.x && x > 0) sizes.min.x = x;
	if (y < sizes.min.y) sizes.min.y = y;
	if (x > sizes.max.x) sizes.max.x = x;
	if (y > sizes.max.y) sizes.max.y = y;
}

class Branch {
	#path: Path2D;
	#colors: { green: string[]; brown: string };
	#lineWidth: number;
	#list: Branch[];
	#leaves: Leaf[];
	#sizes: Sizes;
	startingPoint: { x: number; y: number };
	constructor(
		x: number,
		y: number,
		angle: number,
		maxWidth: number,
		depth = 0,
		colors = {
			green: shuffle(randArr(SHADES_OF_GREEN)).slice(0, 3),
			brown: randArr(SHADES_OF_BROWN),
		},
		leafs: Leaf[] = [],
		sizes = {
			min: { x: Infinity, y: Infinity },
			max: { x: -Infinity, y: -Infinity },
		},
	) {
		this.startingPoint = { x, y };
		let [currX, currY] = [x, y];
		this.#path = new Path2D();
		this.#colors = colors;
		this.#lineWidth = 20 - 10 * depth;
		this.#list = [];
		this.#leaves = leafs;
		this.#sizes = sizes;
		this.#path.moveTo(x, y);
		let i = 0;
		while (true) {
			if ((maxWidth * 0.0065) / (depth + 1) < i) break;
			let branchLength = 50 + Math.random() * (100 / (depth + 2));
			let branchAngle = gaussianRandom(depth > 0 ? angle - 30 : angle, 30);
			let [toX, toY] = atAngle(currX, currY, branchLength, branchAngle);
			if (toX > maxWidth || toX < 0) break;
			amendBindingBox(toX, toY, this.#sizes);
			if (Math.random() > 0.75 && depth < 1) {
				this.#list.push(
					new Branch(
						...atAngle(currX, currY, branchLength / 2, branchAngle),
						branchAngle + randSign() * 90,
						maxWidth,
						depth + 1,
						colors,
						leafs,
						sizes,
					),
				);
			}
			[currX, currY] = [toX, toY];
			this.#path.lineTo(currX, currY);
			i++;
		}
		i = 0;
		while (i < 10 || Math.random() > 0.1) {
			this.#leaves.push(new Leaf(currX, currY, randArr(colors.green), sizes));
			i++;
		}
	}

	grow(c: CanvasRenderingContext2D) {
		c.lineWidth = this.#lineWidth;
		c.strokeStyle = this.#colors.brown;
		c.stroke(this.#path);
		this.#leaves.forEach((leaf) => leaf.grow(c));
		this.#list.forEach((branch) => branch.grow(c));
	}

	update(canvas?: HTMLCanvasElement) {
		if (!canvas) {
			canvas = document.createElement("canvas");
			canvas.classList.add("tree");
			canvas.width =
				diff(this.#sizes.max.x, this.#sizes.min.x) +
				MAX_LEAF_RADIUS +
				MAX_LEAF_DISTANCE;
			canvas.height =
				diff(this.#sizes.max.y, this.#sizes.min.y) +
				MAX_LEAF_RADIUS * 2 +
				MAX_LEAF_DISTANCE * 2;
			canvas.style.width = `${canvas.width / SCALE_FACTOR}px`;
			canvas.style.height = `${canvas.height / SCALE_FACTOR}px`;

			trees.appendChild(canvas);
		}
		const ctx = canvas.getContext("2d")!;
		const offsetX =
			this.startingPoint.x > 0
				? this.#sizes.min.x - MAX_LEAF_DISTANCE - MAX_LEAF_RADIUS
				: this.#sizes.min.x;
		ctx.translate(
			-offsetX,
			-(this.#sizes.min.y - MAX_LEAF_DISTANCE - MAX_LEAF_RADIUS),
		);
		this.grow(ctx);
		return {
			canvas,
		};
	}
}

const MAX = (window.innerWidth / 2) * SCALE_FACTOR;

export function renderTrees() {
	for (const branch of [
		new Branch(MAX, 0, 200, MAX),
		new Branch(0, 0, 20, MAX),
	]) {
		const { canvas } = branch.update();
		canvas.style[branch.startingPoint.x > 0 ? "right" : "left"] = "0px";
	}
}
