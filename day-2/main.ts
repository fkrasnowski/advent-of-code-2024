import { slidingWindows } from "@std/collections";
const textFile = await Deno.readTextFile("./input.txt");

export function toReports(text: string) {
  return text.split("\n").map((line) =>
    line.split(" ").filter((c) => c !== "").map(Number)
  );
}

export function isReportSafe(report: number[]) {
  let step: "increase" | "decrease";

  return slidingWindows(report, 2).every(([n1, n2]) => {
    const currentStep = n2 > n1 ? "increase" : "decrease";
    step ??= currentStep;

    if (step !== currentStep) return false;

    const diff = Math.abs(n1 - n2);

    if (!(1 <= diff && diff <= 3)) return false;

    return true;
  });
}

export function part1(text = textFile) {
  const reports = toReports(text);

  const safeReports = reports.filter(isReportSafe);

  return safeReports.length;
}

console.log(part1());

export function without(array: number[], index: number) {
  return array.toSpliced(index, 1);
}

export function part2(text = textFile) {
  const reports = toReports(text);

  const safeReports = reports.filter((report) =>
    report.keys().map((i) => without(report, i)).some(isReportSafe)
  );

  return safeReports.length;
}

console.log(part2());
