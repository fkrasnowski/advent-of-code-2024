const textFile = await Deno.readTextFile("./input.txt");

export function xmaxLineCount(line: string) {
  return (line.match(/XMAS/g) || []).length;
}

export function xmasCount(text: string) {
  let count = 0;
  for (const line of text.split("\n")) {
    count += xmaxLineCount(line);
  }
  return count;
}

function* interateVerical(text: string) {
  const lines = text.split("\n");
  const lineLength = lines[0].length;
  for (let i = 0; i < lineLength; i++) {
    for (const line of lines) {
      yield line[i];
    }
    yield "\n";
  }
}

export function toVertical(text: string) {
  return [...interateVerical(text)].join("");
}

function* iterateDiagonal(text: string) {
  const chars = text.split("\n").map((line) => line.split(""));
  const max = Math.max(chars.length, chars[0].length);

  let i = 0;
  let iy = 0;
  let ix = 0;
  while (iy < max && ix < max) {
    const char = chars[i + iy]?.[i + ix];
    if (char) {
      yield char;
      i++;
    } else {
      yield "\n";
      i = 0;
      if (iy) {
        ix = iy;
        iy = 0;
      } else if (ix) {
        iy = ix + 1;
        ix = 0;
      } else {
        iy++;
      }
    }
  }
}

export function toDiagonal(text: string) {
  return [...iterateDiagonal(text)].join("");
}

export function toSecondDiagonal(text: string) {
  return toDiagonal(text.split("\n").reverse().join("\n"));
}

export function reverse(text: string) {
  return text.split("").reverse().join("");
}

export function part1(text = textFile) {
  return xmasCount(text) + xmasCount(reverse(text)) +
    xmasCount(toVertical(text)) + xmasCount(reverse(toVertical(text))) +
    xmasCount(toDiagonal(text)) + xmasCount(reverse(toDiagonal(text))) +
    xmasCount(toSecondDiagonal(text)) +
    xmasCount(reverse(toSecondDiagonal(text)));
}

console.log(part1());

export function part2(text = textFile) {
  const chars = text.split("\n").map((line) => line.split(""));

  let count = 0;
  for (const [y, line] of chars.entries()) {
    for (const [x, char] of line.entries()) {
      if (char === "A") {
        const diagonal = (chars[y - 1]?.[x - 1] ?? "*") + char +
          (chars[y + 1]?.[x + 1] ?? "*");

        const secondDiagonal = (chars[y - 1]?.[x + 1] ?? "*") + char +
          (chars[y + 1]?.[x - 1] ?? "*");

        const isXMAS = [diagonal, reverse(diagonal)].includes("MAS") &&
          [secondDiagonal, reverse(secondDiagonal)].includes("MAS");

        if (isXMAS) count++;
      }
    }
  }
  return count;
}

console.log(part2());
