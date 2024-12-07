const textFile = await Deno.readTextFile("./input.txt");

type Guard = "^" | "<" | ">" | "v";
type Item = "." | "#" | "X" | Guard;
function toMap(text: string): Item[][] {
  return text.split("\n").map((line) => line.split("") as Item[]);
}

function findGuard(map: Item[][]): { x: number; y: number } {
  for (const [y, line] of map.entries()) {
    for (const [x, item] of line.entries()) {
      if (item === "^") return { x, y };
    }
  }

  throw new Error("not found");
}

function isGuard(item: Item): item is Guard {
  return ["^", "<", ">", "v"].includes(item);
}

function rotateGuard(guard: Guard): Guard {
  return {
    "^": ">",
    ">": "v",
    "v": "<",
    "<": "^",
  }[guard] as Guard;
}

class GuardMap {
  constructor(private x: number, private y: number, public map: Item[][]) {}

  get current(): Item | undefined {
    return this.map[this.y]?.[this.x];
  }

  set current(item: Item) {
    this.map[this.y][this.x] = item;
  }

  walk() {
    while (this.move()) { /* Make those moves  */ }
  }
  move() {
    const oldX = this.x;
    const oldY = this.y;
    const oldCurrent = this.current;

    if (!oldCurrent) throw new Error("out of bounds");
    if (!isGuard(oldCurrent)) throw new Error("missing guard");
    this.current = "X";
    switch (oldCurrent) {
      case "^":
        this.y--;
        break;
      case "v":
        this.y++;
        break;
      case "<":
        this.x--;
        break;
      case ">":
        this.x++;
        break;
    }
    if (!this.current) return false;
    if (this.current as Item === "#") {
      this.x = oldX;
      this.y = oldY;
      this.current = rotateGuard(oldCurrent);
      return true;
    } else if (this.current as Item === "." || this.current as Item === "X") {
      this.current = oldCurrent;
      return true;
    } else {
      throw new Error("unreachable");
    }
  }
}

function part1(text = textFile) {
  const map = toMap(text);
  const guard = findGuard(map);
  const guardMap = new GuardMap(guard.x, guard.y, map);
  guardMap.walk();

  return guardMap.map.flat().filter((item) => item === "X").length;
}

console.log(part1());
