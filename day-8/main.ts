const textFile = await Deno.readTextFile("./input.txt");

type Position = {
  x: number;
  y: number;
};

type Antennas = Record<string, Set<Position>>;
function toMap(text: string): string[][] {
  return text.split("\n").map((line) => line.split(""));
}

function isLetter(char: string) {
  return char.toLowerCase() !== char.toUpperCase();
}

function isDigit(char: string) {
  return char >= "0" && char <= "9";
}

const isAntenna = (char: string) => isLetter(char) || isDigit(char);

function findAntennas(map: string[][]): Antennas {
  const antennas: Antennas = {};
  for (const [y, line] of map.entries()) {
    for (const [x, item] of line.entries()) {
      if (isAntenna(item)) {
        const antennasOfKind = antennas[item] ??= new Set();
        antennasOfKind.add({ x, y });
      }
    }
  }
  return antennas;
}

function* iterateCombinations<T>(array: T[]) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      yield [array[i], array[j]] as [T, T];
    }
  }
}

function getAntinodes(
  a: Position,
  b: Position,
  { isInside, resonate }: {
    isInside: (x: number, y: number) => boolean;
    resonate: number | null;
  },
): Position[] {
  const antinodes: Position[] = [];

  const isResonating = resonate !== null;
  resonate ??= 1;

  const node1 = {
    x: a.x + (a.x - b.x) * resonate,
    y: a.y + (a.y - b.y) * resonate,
  };

  if (isInside(node1.x, node1.y)) antinodes.push(node1);

  const node2 = {
    x: b.x + (b.x - a.x) * resonate,
    y: b.y + (b.y - a.y) * resonate,
  };

  if (isInside(node2.x, node2.y)) antinodes.push(node2);

  if (isResonating && antinodes.length) {
    return [
      ...antinodes,
      ...getAntinodes(a, b, { resonate: resonate + 1, isInside }),
    ];
  }

  return antinodes;
}

function findAntinodes(
  antennas: Antennas,
  { isInside, isResonating }: {
    isInside: (x: number, y: number) => boolean;
    isResonating?: boolean;
  },
) {
  const antinodesSet = new Set<`${number},${number}`>();
  for (const positions of Object.values(antennas)) {
    for (const [a, b] of iterateCombinations([...positions])) {
      const nodes = getAntinodes(a, b, {
        isInside,
        resonate: isResonating ? 0 : null,
      });
      for (const node of nodes) {
        antinodesSet.add(`${node.x},${node.y}`);
      }
    }
  }

  return [...antinodesSet].map((pos) =>
    pos.split(",").map(Number) as [number, number]
  );
}

export function part1(text = textFile) {
  const map = toMap(text);
  const maxX = map[0].length;
  const maxY = map.length;

  const isInside = (x: number, y: number) =>
    x >= 0 && x < maxX && y >= 0 && y < maxY;

  const antennas = findAntennas(map);
  const antinodes = findAntinodes(antennas, { isInside });

  return antinodes.filter(([nodeX, nodeY]) => isInside(nodeX, nodeY)).length;
}

console.log(part1());

export function part2(text = textFile) {
  const map = toMap(text);
  const maxX = map[0].length;
  const maxY = map.length;

  const isInside = (x: number, y: number) =>
    x >= 0 && x < maxX && y >= 0 && y < maxY;

  const antennas = findAntennas(map);
  const antinodes = findAntinodes(antennas, { isInside, isResonating: true });

  return antinodes.filter(([nodeX, nodeY]) => isInside(nodeX, nodeY)).length;
}

console.log(part2());
