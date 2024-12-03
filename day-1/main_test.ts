import { assertEquals } from "@std/assert";
import { part1, part2, toSortedLists } from "./main.ts";

const input = `
  3   4
  4   3
  2   5
  1   3
  3   9
  3   3
  `.trim();

Deno.test("toSortedLists", () => {
  assertEquals(toSortedLists(input), [
    [1, 2, 3, 3, 3, 4],
    [3, 3, 3, 4, 5, 9],
  ]);
});

Deno.test("part 1", () => {
  assertEquals(part1(input), 11);
});

Deno.test("part 2", () => {
  assertEquals(part2(input), 31);
});

setTimeout(() => console.log("0"), 0);
Promise.resolve().then(() => console.log("1"));
queueMicrotask(() => console.log("2"));
console.log("3");
