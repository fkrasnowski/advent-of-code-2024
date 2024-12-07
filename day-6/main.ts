const textFile = await Deno.readTextFile("./input.txt");

type Guard = "^" | "<" | ">" | "v";
type Item = "." | "#" | "O" | Guard;
type Position = { x: number; y: number };

export function toMap(text: string): Item[][] {
  return text.split("\n").map((line) => line.split("") as Item[]);
}

export function findGuard(map: Item[][]): Position {
  for (const [y, line] of map.entries()) {
    for (const [x, item] of line.entries()) {
      if (item === "^") return { x, y };
    }
  }

  throw new Error("not found");
}

function isObstacle(item: Item): item is "O" | "#" {
  return ["O", "#"].includes(item);
}

function rotateGuard(guard: Guard): Guard {
  return {
    "^": ">",
    ">": "v",
    "v": "<",
    "<": "^",
  }[guard] as Guard;
}

function getNextPosition(
  { x, y }: Position,
  guard: Guard,
): Position {
  switch (guard) {
    case "^":
      return { x, y: y - 1 };
    case "v":
      return { x, y: y + 1 };
    case "<":
      return { x: x - 1, y };
    case ">":
      return { x: x + 1, y };
  }
}

export class GuardMap {
  isLoop: boolean = false;
  movesMap = new Map<string, Set<Guard>>();

  private position: Position;
  private guard: Guard;

  constructor(
    public map: Item[][],
    private readonly initialGuardPosition = findGuard(map),
  ) {
    this.position = { ...initialGuardPosition };
    this.guard = map[initialGuardPosition.y][initialGuardPosition.x] as Guard;
  }

  getItem({ x, y }: Position): Item | undefined {
    return this.map[y]?.[x];
  }

  walk() {
    this.reset();
    while (this.move()) { /* Make those moves  */ }
  }
  move() {
    if (this.getMove().has(this.guard)) {
      this.isLoop = true;
      return false;
    }

    this.recordMove();

    const next = getNextPosition(this.position, this.guard);
    const item = this.getItem(next);

    // If out of bounds then stop
    if (!item) return false;

    if (isObstacle(item)) {
      this.guard = rotateGuard(this.guard);
    } else {
      this.position = next;
    }

    return true;
  }

  recordMove(guard: Guard = this.guard, { x, y }: Position = this.position) {
    const key = `${x},${y}`;
    const set = this.movesMap.get(key) ?? new Set();
    set.add(guard);
    this.movesMap.set(key, set);
  }

  getMove({ x, y }: Position = this.position): Set<Guard> {
    const key = `${x},${y}`;
    return this.movesMap.get(key) ?? new Set();
  }

  *getVisitedPositions() {
    for (const [move] of this.movesMap) {
      const [x, y] = move.split(",").map(Number);
      yield { x, y };
    }
  }

  reset() {
    this.position = { ...this.initialGuardPosition };
    // Make it dynamic
    this.guard = "^";
    this.isLoop = false;
    this.movesMap.clear();
  }
}

export function part1(text = textFile) {
  const map = toMap(text);
  const guardMap = new GuardMap(map);
  guardMap.walk();

  return [...guardMap.getVisitedPositions()].length;
}

export function part2(text = textFile) {
  const map = toMap(text);

  const initMap = new GuardMap(map);
  initMap.walk();

  let count = 0;
  const visitedPositions = [...initMap.getVisitedPositions()];

  for (const { x, y } of visitedPositions) {
    // Place obstacle
    initMap.map[y][x] = "O";

    initMap.walk();
    if (initMap.isLoop) count++;

    // Remove obstacle
    initMap.map[y][x] = ".";
  }

  return count;
}
