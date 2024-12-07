const textFile = await Deno.readTextFile("./input.txt");

type Equation = [result: number, nums: number[]];

function parseEquation(line: string): Equation {
  const [result, numsStr] = line.split(": ");
  const nums = numsStr.split(" ").map(Number);
  return [Number(result), nums];
}

function toEquations(text: string): Equation[] {
  return text.split("\n").map(parseEquation);
}
export function createValidator(
  operations: ((n1: number, n2: number) => number)[],
) {
  return function isValidEquation(equation: Equation): boolean {
    const [result, nums] = equation;

    if (nums.length < 1) throw new Error("missing number");
    if (nums.length === 1) return nums[0] === result;

    const [a, b, ...rest] = nums;

    if (a > result) return false;

    return operations.some((op) =>
      isValidEquation([result, [op(a, b), ...rest]])
    );
  };
}

export function part1(text = textFile) {
  const isValidEquation = createValidator([
    (n1, n2) => n1 + n2,
    (n1, n2) => n1 * n2,
  ]);
  return toEquations(text).filter(isValidEquation).reduce((a, [b]) => a + b, 0);
}

console.log(part1());

export function part2(text = textFile) {
  const isValidEquation = createValidator([
    (n1, n2) => n1 + n2,
    (n1, n2) => n1 * n2,
    (n1, n2) => Number(`${n1}${n2}`),
  ]);
  return toEquations(text).filter(isValidEquation).reduce(
    (a, [b]) => a + b,
    0,
  );
}

console.log(part2());
