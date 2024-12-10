import { assertEquals } from "@std/assert";
import {
  compactLongFormat,
  longFormatFileSplit,
  part1,
  part2,
  toLongFormat,
  wholeFileCompact,
} from "./main.ts";

const input = "2333133121414131402";

Deno.test("toLongFormat", () => {
  assertEquals(
    toLongFormat(input).join(""),
    "00...111...2...333.44.5555.6666.777.888899",
  );
});

Deno.test("compactLongFormat", () => {
  assertEquals(
    compactLongFormat(toLongFormat(input)).join(""),
    "0099811188827773336446555566..............",
  );
});

Deno.test("part 1", () => {
  assertEquals(part1(input), 1928);
});

Deno.test("longFormatFileSplit", () => {
  assertEquals(
    longFormatFileSplit(toLongFormat(input)),
    [
      ["0", "0"],
      [".", ".", "."],
      ["1", "1", "1"],
      [".", ".", "."],
      ["2"],
      [".", ".", "."],
      ["3", "3", "3"],
      ["."],
      ["4", "4"],
      ["."],
      ["5", "5", "5", "5"],
      ["."],
      ["6", "6", "6", "6"],
      ["."],
      ["7", "7", "7"],
      ["."],
      ["8", "8", "8", "8"],
      ["9", "9"],
    ],
  );
});

Deno.test("wholeFileCompact", () => {
  assertEquals(
    wholeFileCompact(toLongFormat(input)).join(""),
    "00992111777.44.333....5555.6666.....8888..",
  );
});

Deno.test("part 2", () => {
  assertEquals(part2(input), 2858);
});
