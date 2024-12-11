import { memoize } from "@std/cache";

const textFile = await Deno.readTextFile("./input.txt");

export function toStones(text: string) {
  return text.split(" ").map(Number);
}

export function splitNumber(num: number): [number, number] {
  const left = num.toString().slice(0, num.toString().length / 2);
  const right = num.toString().slice(num.toString().length / 2);

  return [Number(left), Number(right)];
}

export function blink(stone: number): number[] {
  if (stone === 0) return [1];
  if (stone.toString().length % 2 === 0) return splitNumber(stone);
  return [stone * 2024];
}

export function blinkedStonesCount(
  stones: number[],
  times: number,
): number {
  const countStones = memoize((stone: number, times: number): number => {
    if (times === 0) return 1;

    const count = blink(stone)
      .map((stone) => countStones(stone, times - 1))
      .reduce((a, b) => a + b, 0) as number;

    return count;
  });

  return stones.map((stone) => countStones(stone, times)).reduce(
    (a, b) => a + b,
    0,
  );
}

export function part1(text = textFile) {
  return blinkedStonesCount(toStones(text), 25);
}

console.log(part1());

export function part2(text = textFile) {
  return blinkedStonesCount(toStones(text), 75);
}

console.log(part2());
