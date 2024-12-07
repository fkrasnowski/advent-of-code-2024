import { assertEquals } from "@std/assert";
import { findGuard, GuardMap, part1, part2, toMap } from "./main.ts";

const input = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`.trim();

Deno.test("toMap", () => {
  assertEquals(toMap(input), [
    [".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "#", ".", ".", "^", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
  ]);
});

Deno.test("findGuard", () => {
  assertEquals(findGuard(toMap(input)), { x: 4, y: 6 });
});

Deno.test("GuardMap", () => {
  const map = toMap(input);
  const guardMap = new GuardMap(map);

  guardMap.move();

  assertEquals(guardMap.movesMap.size, 1);

  guardMap.move();
  guardMap.move();

  assertEquals(guardMap.movesMap.size, 3);
  assertEquals([...guardMap.movesMap.entries()], [
    ["4,6", new Set(["^"])],
    ["4,5", new Set(["^"])],
    ["4,4", new Set(["^"])],
  ]);

  guardMap.map[6][3] = "O";
  guardMap.walk();

  assertEquals(guardMap.isLoop, true);

  guardMap.reset();

  assertEquals(guardMap.movesMap.size, 0);
});

Deno.test("part 1", () => {
  assertEquals(part1(input), 41);
});

Deno.test("part 2", () => {
  assertEquals(part2(input), 6);
});
