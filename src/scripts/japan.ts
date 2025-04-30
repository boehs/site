const SHADES_OF_GREEN = [
  // Pink
  ["#ec275f", "#f25477", "#ffa7a6", "#ffdcdc", "#d4e0ee"],
  // Green
  ["#3CB371", "#8A9A5B", "#3EB489", "#00AD83", "#01796F", "#1DB954", "#00674b"],
  // Brown
  ["#d4e09b", "#f6f4d2", "#cbdfbd", "#f19c79"]
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

let trees = document.querySelector('.trees')!;

const diff = (a, b) => (a > b ? a - b : b - a);

const shuffle = <T,>(arr: T[]) =>
  arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const randSign = () => (Math.random() < 0.5 ? -1 : 1);
const randArr = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

type Sizes = {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

class Leaf {
  x: number;
  y: number;
  color: string;
  rotation: number;
  radius: number;
  constructor(xe: number, ye: number, color: string, sizes: Sizes) {
    this.x = xe + Math.random() * (MAX_LEAF_DISTANCE) - (25 * SCALE_FACTOR);
    this.y = ye + Math.random() * (25 * SCALE_FACTOR) - (25 * SCALE_FACTOR);
    this.color = color;
    this.rotation = Math.random() * 360;
    this.radius = (MAX_LEAF_RADIUS) + Math.random() * MAX_LEAF_RADIUS;
    amendBindingBox(this.x, this.y, sizes);
  }

  grow(c: CanvasRenderingContext2D) {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.rotation);
    c.beginPath();
    const radiusY = this.radius >> 1;
    const x2 = this.radius >> 1;
    const y2 = radiusY >> 1;
    c.ellipse(x2, y2, this.radius, radiusY, 0, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }
}

/**
 * Get cords from starting point, length, and angle
 */
function atAngle(
  x: number,
  y: number,
  length: number,
  angle: number
): [number, number] {
  let radians = angle * (Math.PI / 180);
  let newX = x + length * Math.cos(radians);
  let newY = y + length * Math.sin(radians);
  return [newX, newY];
}

function amendBindingBox(
  x: number,
  y: number,
  sizes: Sizes
) {
  if (x < sizes.min.x && x > 0) sizes.min.x = x;
  if (y < sizes.min.y) sizes.min.y = y;
  if (x > sizes.max.x) sizes.max.x = x;
  if (y > sizes.max.y) sizes.max.y = y;
}

class Branch {
  path: Path2D;
  colors: { green: string[]; brown: string };
  lw: number;
  list: Branch[];
  leafs: Leaf[];
  sizes: Sizes;
  startingPoint: { x: number; y: number };
  constructor(
    eex: number,
    yyy: number,
    angle: number,
    maxWidth,
    n = 0,
    colors = {
      green: shuffle(randArr(SHADES_OF_GREEN)).slice(0, 3),
      brown: randArr(SHADES_OF_BROWN)
    },
    leafs: Leaf[] = [],
    sizes = {
      min: { x: Infinity, y: Infinity },
      max: { x: -Infinity, y: -Infinity }
    },
  ) {
    this.startingPoint = { x: eex, y: yyy };
    let ex = eex;
    let why = yyy;
    this.path = new Path2D();
    this.colors = colors;
    this.lw = 20 - 10 * n;
    this.list = [];
    this.leafs = leafs;
    this.sizes = sizes;
    this.path.moveTo(ex, why);
    let i = 0;
    while (true) {
      if ((maxWidth*0.0065) / (n + 1) < i) break;
      let intended_length = 50 + Math.random() * (100 / (n + 2));
      let computedAngle = gaussianRandom(n > 0 ? angle - 30 : angle, 30);
      let computedCords = atAngle(ex, why, intended_length, computedAngle);
      if (
        computedCords[0] > maxWidth ||
        computedCords[0] < 0
      )
        break;
      amendBindingBox(...computedCords, this.sizes);
      if (Math.random() > 0.75 && n < 1) {
        this.list.push(
          new Branch(
            ...atAngle(ex, why, intended_length / 2, computedAngle),
            computedAngle + randSign() * 90,
            maxWidth,
            n + 1,
            colors,
            leafs,
            sizes
           )
        );
      }
      [ex, why] = computedCords;
      this.path.lineTo(ex, why);
      i++;
    }
    i = 0;
    while (i < 10 || Math.random() > 0.1) {
      this.leafs.push(new Leaf(ex, why, randArr(colors.green), sizes));
      i++;
    }
  }

  grow(c: CanvasRenderingContext2D) {
    c.lineWidth = this.lw;
    c.strokeStyle = this.colors.brown;
    c.stroke(this.path);
    this.leafs.forEach((leaf) => leaf.grow(c));
    this.list.forEach((branch) => branch.grow(c));
  }

  update(canvas?: HTMLCanvasElement) {
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.classList.add('tree');
      canvas.width = diff(this.sizes.max.x, this.sizes.min.x) + MAX_LEAF_RADIUS + MAX_LEAF_DISTANCE;
      canvas.height = diff(this.sizes.max.y, this.sizes.min.y) + (MAX_LEAF_RADIUS * 2) + (MAX_LEAF_DISTANCE * 2);
      canvas.style.width = `${(canvas.width / SCALE_FACTOR)}px`;
      canvas.style.height = `${(canvas.height / SCALE_FACTOR)}px`;

      trees.appendChild(canvas);
    }
    let c = canvas.getContext("2d")!;
    if (this.startingPoint.x > 0) {
      c.translate(
        -(this.sizes.min.x - MAX_LEAF_DISTANCE - MAX_LEAF_RADIUS),
        -(this.sizes.min.y - MAX_LEAF_DISTANCE - MAX_LEAF_RADIUS)
      );
    } else {
      c.translate(
        -this.sizes.min.x,
        -(this.sizes.min.y - MAX_LEAF_DISTANCE - MAX_LEAF_RADIUS)
      );
    };
    this.grow(c);
    return {
      canvas,
    }
  };
}


const MAX = ((window.innerWidth) / 2) * SCALE_FACTOR;

export function renderTrees() {
  for (const branch of [new Branch(MAX, 0, 200, MAX),new Branch(0, 0, 20, MAX)]) {
      const { canvas } = branch.update();
      canvas.style[branch.startingPoint.x > 0 ? 'right' : 'left'] = '0px';
  }
}
