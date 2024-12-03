import { assertEquals } from "@std/assert";
import { part1, part2, toMuls, toMulsWithConditionsApplied } from "./main.ts";

const input =
  `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

Deno.test("toMuls", () => {
  assertEquals(toMuls(input), [
    [2, 4],
    [5, 5],
    [11, 8],
    [8, 5],
  ]);
});

Deno.test("toMulsWithConditionsApplied", () => {
  assertEquals(
    toMulsWithConditionsApplied(input),
    [
      [2, 4],
      [8, 5],
    ],
  );
});

Deno.test("part 1", () => {
  assertEquals(part1(input), 161);
});

Deno.test("part 2", () => {
  assertEquals(part2(input), 48);
});
