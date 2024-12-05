const textFile = await Deno.readTextFile("./input.txt");

function parseInput(input: string) {
  const [orderRulesStr, updatesStr] = input.split("\n\n");

  const orderRules = orderRulesStr.split("\n").map((line) =>
    line.split("|").map(Number)
  );
  const updates = updatesStr.split("\n").map((line) =>
    line.split(",").map(Number)
  );

  return { orderRules, updates };
}

function arrayEqual(a: number[], b: number[]) {
  return a.every((v, i) => v === b[i]);
}

function createOrderComparator(
  orderRules: number[][],
): (a: number, b: number) => number {
  return (a, b) => {
    if (orderRules.some(([first, second]) => a === first && b === second)) {
      return -1;
    }
    if (orderRules.some(([first, second]) => a === second && b === first)) {
      return 1;
    }
    return 0;
  };
}

function isCorrectOrder(update: number[], orderRules: number[][]) {
  return arrayEqual(update, update.toSorted(createOrderComparator(orderRules)));
}

export function part1(text = textFile) {
  const { orderRules, updates } = parseInput(text);

  console.log(updates.length);
  const correctUpdates = updates.filter((update) =>
    isCorrectOrder(update, orderRules)
  );

  const middleNumbers = correctUpdates.map(
    (update) => update[Math.floor(update.length / 2)],
  );

  return middleNumbers.reduce((a, b) => a + b, 0);
}

console.log(part1());

export function part2(text = textFile) {
  const { orderRules, updates } = parseInput(text);

  const incorrectUpdates = updates.filter((update) =>
    !isCorrectOrder(update, orderRules)
  );

  const compare = createOrderComparator(orderRules);

  const middleNumbers = incorrectUpdates.map((update) => update.sort(compare))
    .map(
      (update) => update[Math.floor(update.length / 2)],
    );

  return middleNumbers.reduce((a, b) => a + b, 0);
}

console.log(part2());
