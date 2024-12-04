import { assertEquals } from "@std/assert";
import {
  part1,
  part2,
  reverse,
  toDiagonal,
  toSecondDiagonal,
  toVertical,
  xmasCount,
} from "./main.ts";

const input = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.trim();

Deno.test("xmasCount", () => {
  assertEquals(xmasCount("XMAS&*$#X\nMAS@XMAS"), 2);
});

Deno.test("toVertical", () => {
  assertEquals(toVertical("AA\nBB\nCC"), "ABC\nABC\n");
});

Deno.test("reverse", () => {
  assertEquals(reverse("xmas"), "samx");
});

Deno.test("toDiagonal", () => {
  assertEquals(toDiagonal("123\nABC\nXYZ"), "1BZ\nAY\n2C\nX\n3\n");
});

Deno.test("toDiagonal", () => {
  assertEquals(toSecondDiagonal("123\nABC\nXYZ"), "XB3\nA2\nYC\n1\nZ\n");
});

Deno.test("part 1", () => {
  assertEquals(part1(input), 18);
});

Deno.test("part 2", () => {
  assertEquals(part2(input), 9);
});
