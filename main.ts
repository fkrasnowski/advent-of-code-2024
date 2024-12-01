import { sumOf, unzip, zip } from "@std/collections";

const textFile = await Deno.readTextFile("./input.txt");

export function toSortedLists(text: string) {
  const [leftList, rightList] = unzip(
    text.split("\n").map((line) =>
      line.split(" ").filter((c) => c !== "").map(Number) as [number, number]
    ),
  );

  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  return [leftList, rightList];
}

// part 1
export function part1(text = textFile) {
  const [leftList, rightList] = toSortedLists(text);

  const distances = zip(leftList, rightList).map(([a, b]) => Math.abs(a - b));
  const totalDistance = sumOf(distances, (v) => v);

  return totalDistance;
}

console.log(part1());

// part 2
export function part2(text = textFile) {
  const [leftList, rightList] = toSortedLists(text);

  let similarity = 0;
  for (const item of leftList) {
    let count = 0;
    for (const rightItem of rightList) {
      if (rightItem > item) break;
      if (rightItem === item) count++;
    }
    similarity += count * item;
  }

  return similarity;
}

console.log(part2());
