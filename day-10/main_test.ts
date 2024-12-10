import { assertEquals } from "@std/assert";
import { findTrailheads, part1, part2, toMap } from "./main.ts";

const input = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`.trim();

Deno.test("findTrailheads", () => {
  assertEquals(findTrailheads(toMap(input)), [
    { x: 2, y: 0 },
    { x: 4, y: 0 },
    { x: 4, y: 2 },
    { x: 6, y: 4 },
    { x: 2, y: 5 },
    { x: 5, y: 5 },
    { x: 0, y: 6 },
    { x: 6, y: 6 },
    { x: 1, y: 7 },
  ]);
});

Deno.test("part 1", () => {
  assertEquals(part1(input), 36);
});

Deno.test("part 2", () => {
  assertEquals(part2(input), 81);
});
