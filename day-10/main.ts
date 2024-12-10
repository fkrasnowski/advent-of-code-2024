const textFile = await Deno.readTextFile("./input.txt");

type Position = {
  x: number;
  y: number;
};

export function toMap(text: string): number[][] {
  return text.split("\n").map((line) => line.split("").map(Number));
}

export function findTrailheads(map: number[][]): Position[] {
  const trailheads: Position[] = [];

  for (const [y, line] of map.entries()) {
    for (const [x, item] of line.entries()) {
      if (item === 0) trailheads.push({ x, y });
    }
  }
  return trailheads;
}

export function calculateTrailScore(
  head: Position,
  map: number[][],
  visited?: Set<string>,
): number {
  const { x, y } = head;

  const value = map[y][x];

  if (value === 9 && !visited?.has(`${x},${y}`)) {
    visited?.add(`${x},${y}`);
    return 1;
  }

  const nextValue = value + 1;

  return [[1, 0], [0, 1], [-1, 0], [0, -1]]
    .map(([dx, dy]) => ({
      x: x + dx,
      y: y + dy,
    })).filter(({ x, y }) => map[y]?.[x] === nextValue).map((pos) =>
      calculateTrailScore(pos, map, visited)
    ).reduce((a, b) => a + b, 0);
}

export function part1(text = textFile) {
  const map = toMap(text);
  const trailheads = findTrailheads(map);

  return trailheads.map((head) => calculateTrailScore(head, map, new Set()))
    .reduce(
      (a, b) => a + b,
      0,
    );
}

console.log(part1());

export function part2(text = textFile) {
  const map = toMap(text);
  const trailheads = findTrailheads(map);

  return trailheads.map((head) => calculateTrailScore(head, map))
    .reduce(
      (a, b) => a + b,
      0,
    );
}

console.log(part2());
