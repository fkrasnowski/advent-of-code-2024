import { assertEquals } from "@std/assert";
import { blink, blinkedStonesCount, part1, toStones } from "./main.ts";

const input = "125 17";

Deno.test("blink", () => {
  assertEquals(blink(0), [1]);
  assertEquals(blink(1), [2024]);
  assertEquals(blink(22), [2, 2]);
});

Deno.test("blinkedStonesCount", () => {
  assertEquals(blinkedStonesCount(toStones(input), 6), 22);
  assertEquals(blinkedStonesCount(toStones(input), 25), 55312);
});

Deno.test("part 1", () => {
  assertEquals(part1(input), 55312);
});
