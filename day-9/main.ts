import { LinkedList } from "fast-linked-list";

const textFile = await Deno.readTextFile("./input.txt");

function arrayFromLength<T>(length: number, item: T) {
  return Array.from({ length }, () => item);
}

export function toLongFormat(input: string) {
  const nums = input.split("").map(Number);

  return nums.flatMap((n, i) => {
    if (i % 2 === 0) return arrayFromLength(n, String(i / 2));
    return arrayFromLength(n, ".");
  });
}

export function compactLongFormat(longFormat: string[]) {
  let cursorLeft = 0;
  let cursorRight = longFormat.length - 1;

  while (cursorLeft < cursorRight) {
    const charLeft = longFormat[cursorLeft];
    const charRight = longFormat[cursorRight];

    if (charLeft !== ".") {
      cursorLeft++;
      continue;
    }

    if (charRight === ".") {
      cursorRight--;
      continue;
    }

    longFormat[cursorLeft] = charRight;
    longFormat[cursorRight] = charLeft;
  }

  return longFormat;
}

export function checksum(compactFormat: string[]) {
  const nums = compactFormat.map(Number);
  return nums.map((n, i) => Number.isNaN(n) ? 0 : n * i).reduce(
    (a, b) => a + b,
    0,
  );
}

export function part1(input = textFile) {
  return checksum(compactLongFormat(toLongFormat(input)));
}

export function longFormatFileSplit(longFormat: string[]) {
  return longFormat.reduce(
    (acc, value) =>
      acc.at(-1)?.at(-1) === value
        ? acc.slice(0, -1).concat([[...acc.at(-1)!, value]])
        : [...acc, [value]],
    [] as string[][],
  );
}

export function wholeFileCompact(longFormat: string[]) {
  const files = new LinkedList(...longFormatFileSplit(longFormat));

  let left = files.firstToken;
  let right = files.lastToken;

  while (right !== files.firstToken) {
    if (left === right) {
      right = right.prev!;
      left = files.firstToken;
      continue;
    }

    const fileLeft = left.value;
    const fileRight = right.value;

    if (fileRight[0] === ".") {
      right = right.prev!;
      continue;
    }

    if (fileLeft.length < fileRight.length || fileLeft[0] !== ".") {
      left = left.next!;
      continue;
    }

    const remaining = fileLeft.length - fileRight.length;
    left.value = fileRight;
    right.value = arrayFromLength(fileRight.length, ".");

    if (remaining > 0) {
      left.insertAfter(arrayFromLength(remaining, "."));
    }

    left = files.firstToken;
  }

  return files.toArray().flat();
}

console.log(part1());

export function part2(input = textFile) {
  return checksum(wholeFileCompact(toLongFormat(input)));
}

console.log(part2());
