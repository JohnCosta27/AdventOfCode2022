import { file } from "bun";
import { Day1 } from "./Day1/day1";
import { Day2 } from "./Day2";
import { Day3 } from "./Day3";
import { Day4 } from "./Day4";
import { Day5 } from "./Day5";

export type DayFunc = (input: string) => [any, any];

console.log("Advent Of Code - 2022");

/*
const day1input = await file('./inputs/day1.txt').text();
console.time("Time Taken");
const day1result = Day1(day1input);

console.log("------------------Day 1--------------------")
console.log("Part 1:", day1result[0])
console.log("Part 2:", day1result[1])
console.timeEnd("Time Taken");
console.log("------------------------------------------")

const day2input = await file('./inputs/day2.txt').text();
console.time("Time Taken");
const day2result = Day2(day2input);

console.log("------------------Day 1--------------------")
console.log("Part 1:", day2result[0])
console.log("Part 2:", day2result[1])
console.timeEnd("Time Taken");
console.log("------------------------------------------")

const day3input = await file('./inputs/day3.txt').text();
console.time("Time Taken");
const day3result = Day3(day3input);

console.log("------------------Day 3--------------------")
console.log("Part 1:", day3result[0])
console.log("Part 2:", day3result[1])
console.timeEnd("Time Taken");
console.log("------------------------------------------")

const day4input = await file('./inputs/day4.txt').text();
console.time("Time Taken");
const day4result = Day4(day4input);

console.log("------------------Day 3--------------------")
console.log("Part 1:", day4result[0])
console.log("Part 2:", day4result[1])
console.timeEnd("Time Taken");
console.log("------------------------------------------")
*/

const day5input = await file('./inputs/day5.txt').text();
console.time("Time Taken");
const day5result = Day5(day5input);

console.log("------------------Day 3--------------------")
console.log("Part 1:", day5result[0])
console.log("Part 2:", day5result[1])
console.timeEnd("Time Taken");
console.log("------------------------------------------")
