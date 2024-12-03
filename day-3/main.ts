import { sumOf } from "@std/collections";

const textFile = await Deno.readTextFile("./input.txt");

const mulRegex = /mul\(\d+,\d+\)/gm;

function toMulsStrings(text: string) {
  return [...text.matchAll(mulRegex).map((match) => match[0])];
}

export function toMuls(text: string) {
  return toMulsStrings(text).map(parseMul);
}

function parseMul(mul: string) {
  return mul.replace("mul(", "").replace(")", "").split(",").map(Number);
}

export function part1(text = textFile) {
  const muls = toMuls(text);

  return sumOf(muls, ([n1, n2]) => n1 * n2);
}

console.log(part1());

const mulWithConditionsRegex = /(mul\(\d+,\d+\))|(don't\(\))|(do\(\))/gm;

function toMulsWithConditions(text: string) {
  return [...text.matchAll(mulWithConditionsRegex).map((match) => match[0])];
}

function* applyConditions(muls: string[]) {
  let enabled = true;
  for (const mul of muls) {
    if (mul === "don't()") {
      enabled = false;
    } else if (mul === "do()") {
      enabled = true;
    } else if (enabled) yield mul;
  }
}

export function toMulsWithConditionsApplied(text: string) {
  return [...applyConditions(toMulsWithConditions(text))].map(parseMul);
}

export function part2(text = textFile) {
  const muls = toMulsWithConditionsApplied(text);
  return sumOf(muls, ([n1, n2]) => n1 * n2);
}

console.log(part2());
