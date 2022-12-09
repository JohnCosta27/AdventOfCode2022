import { DayFunc } from "..";

const GetSmaller = (arr: number[], target: number): number => {
  let i = 0;
  for (; i < arr.length && arr[i] < target; i++) {}
  return i + 1;
};

export const Day8: DayFunc = (input) => {
  const parsed: number[][] = input
    .trim()
    .split("\n")
    .map((v) => v.split("").map((i) => parseInt(i)));
  const transposed = parsed[0].map((_, colIndex) =>
    parsed.map((row) => row[colIndex])
  );

  let part1 = parsed.length * 2 + parsed[0].length * 2 - 4;
  let part2 = 0;

  for (let i = 1; i < parsed.length - 1; i++) {
    for (let j = 1; j < parsed[0].length - 1; j++) {
      const c = parsed[i][j];
      const row = parsed[i];
      const col = transposed[j];

      const left = row.slice(0, j);
      const right = row.slice(j + 1);
      const top = col.slice(0, i);
      const bottom = col.slice(i + 1);

      if (
        GetSmaller(left.reverse(), c) - 1 === left.length ||
        GetSmaller(right, c) - 1=== right.length ||
        GetSmaller(top.reverse(), c) - 1 === top.length ||
        GetSmaller(bottom, c) - 1 === bottom.length
      ) {
        part1++;
      }
    }
  }

  return [part1, part2];
};
