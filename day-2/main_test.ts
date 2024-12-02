import { assertEquals } from "@std/assert";
import { isReportSafe, part1, part2, toReports, without } from "./main.ts";

const input = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`.trim();

Deno.test("toReports", () => {
  assertEquals(
    toReports(input),
    [
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9],
    ],
  );
});

Deno.test("isReportSafe", () => {
  assertEquals(
    isReportSafe([1, 2, 3, 4, 5]),
    true,
  );
  assertEquals(
    isReportSafe([1, 2, 7, 3, 4]),
    false,
  );
  assertEquals(
    isReportSafe([3, 2, 3, 4, 5, 6]),
    false,
  );
});

Deno.test("without", () => {
  assertEquals(without([1, 2, 3, 4, 5], 0), [2, 3, 4, 5]);
  assertEquals(without([1, 2, 3, 4, 5], 1), [1, 3, 4, 5]);
});

Deno.test("part 1", () => {
  assertEquals(part1(input), 2);
});

Deno.test("part 2", () => {
  assertEquals(part2(input), 4);
});
