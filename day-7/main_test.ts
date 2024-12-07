import { assertEquals } from "@std/assert";
import { createValidator, part1, part2 } from "./main.ts";

const input = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`.trim();

Deno.test("validator", () => {
  const isValid = createValidator([(n1, n2) => n1 + n2]);

  assertEquals(isValid([10, [2, 1, 7]]), true);
  assertEquals(isValid([10, [2, 1, 8]]), false);
});

Deno.test("part 1", () => {
  assertEquals(part1(input), 3749);
});

Deno.test("part 2", () => {
  assertEquals(part2(input), 11387);
});
