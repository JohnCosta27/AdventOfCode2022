import { DayFunc } from "..";

const blocks = [
  [["@", "@", "@", "@"]],
  [
    [".", "@", "."],
    ["@", "@", "@"],
    [".", "@", "."],
  ],
  [
    [".", ".", "@"],
    [".", ".", "@"],
    ["@", "@", "@"],
  ],
  [["@"], ["@"], ["@"], ["@"]],
  [
    ["@", "@"],
    ["@", "@"],
  ],
];

function PrintGrid(grid: string[][]) {
  for (let i = grid.length - 1; i >= 0; i--) {
    for (let j = 0; j < grid[0].length; j++) {
      process.stdout.write(grid[i][j]);
    }
    process.stdout.write("\n");
  }
  process.stdout.write("++++++++++++++++++++++++++++\n");
}

function MoveDown(
  grid: string[][],
  block: string[][],
  [x, y]: [number, number]
): boolean {
  // Moving through the floor.
  if (y - block.length + 1 === 0) return false;
  for (let i = block.length - 1; i >= 0; i--) {
    for (let j = 0; j < block[0].length; j++) {
      if (block[i][j] === "@" && grid[y - i - 1][j + x] === "#") {
        return false;
      }
    }
  }

  // No collision. Clear block.
  for (let i = block.length - 1; i >= 0; i--) {
    for (let j = 0; j < block[0].length; j++) {
      if (block[i][j] === "@") {
        grid[y - i][j + x] = ".";
      }
    }
  }
  y--;
  for (let i = block.length - 1; i >= 0; i--) {
    for (let j = 0; j < block[0].length; j++) {
      if (block[i][j] === "@") {
        grid[y - i][j + x] = "@";
      }
    }
  }
  return true;
}

function MoveSides(
  grid: string[][],
  block: string[][],
  [x, y]: [number, number],
  unit: -1 | 1
): boolean {
  // Goes off the sides
  if (x + unit < 0 || x + block[0].length + unit > grid[0].length) return false;
  for (let i = block.length - 1; i >= 0; i--) {
    for (let j = 0; j < block[0].length; j++) {
      if (block[i][j] === "@" && grid[y - i][j + x + unit] === "#") {
        return false;
      }
    }
  }

  // No collision. Clear block.
  for (let i = block.length - 1; i >= 0; i--) {
    for (let j = 0; j < block[0].length; j++) {
      if (block[i][j] === "@") {
        grid[y - i][j + x] = ".";
      }
    }
  }
  x += unit;
  for (let i = block.length - 1; i >= 0; i--) {
    for (let j = 0; j < block[0].length; j++) {
      if (block[i][j] === "@") {
        grid[y - i][j + x] = "@";
      }
    }
  }
  return true;
}

function SettleBlock(
  grid: string[][],
  block: string[][],
  [x, y]: [number, number]
) {
  for (let i = block.length - 1; i >= 0; i--) {
    for (let j = 0; j < block[0].length; j++) {
      if (block[i][j] === "@") {
        grid[y - i][j + x] = "#";
      }
    }
  }
}

function* BlockGen(start = 0, end = Infinity, step = 1) {
  for (let i = start; i < end; i += step) {
    yield blocks[i % blocks.length]!;
  }
}

export const Day17: DayFunc = (input) => {
  const parsed = input.trim().split("");
  const gen = BlockGen();

  const grid: string[][] = [];
  let jet = 0;
  let part1: number;
  const lcm = parsed.length * 5 * 7;

  const depthMap: Record<string, number> = {};

  for (let i = 0; i < 1000000000000; i++) {

    if (i % lcm === 0) {
      const newDepth = [0, 0, 0, 0, 0, 0, 0];
      for (let a = 0; a < 7; a++) {
        let b = 0;
        for (b = grid.length - 1; b >= 0; b--) {
          if (grid[b][a] === '#') {
            break;
          }
        }
        newDepth[a] = grid.length - b;
      }
      const stringed = JSON.stringify(newDepth);
      if (stringed in depthMap) {
        // console.log(grid.length - depthMap[stringed]);
      } else {
        depthMap[JSON.stringify(newDepth)] = grid.length;
      }
    }

    if (i === 2022) {
      let e = 0;
      for (let i = grid.length - 1; i >= 0; i--) {
        if (grid[i].some((j) => j === "#")) {
          break;
        }
        e++;
      }
      part1 = grid.length - e;
    }
    const block = gen.next().value as string[][];

    // Not right, not necessarily the top row.
    let emptyRows = 0;
    let rock = -1;
    for (let c = grid.length - 1; c >= 0; c--) {
      if (grid[c].some((i) => i === "#")) {
        rock = c;
        break;
      }
      emptyRows++;
    }
    if (emptyRows < 3 + block.length) {
      for (let c = 0; c <= 2 + block.length - emptyRows; c++) {
        grid.push([".", ".", ".", ".", ".", ".", "."]);
      }
    }
    const topLeft: [number, number] = [2, rock + 3 + block.length];

    for (let j = block.length - 1; j >= 0; j--) {
      const newRow = [".", ".", ...block[j]];
      for (let k = 0; k < 5 - block[j].length; k++) {
        newRow.push(".");
      }
      grid[rock === -1 ? 3 - j : block.length - j + rock + 3] = newRow;
    }

    let movedDown = true;
    do {
      if (parsed[jet % parsed.length] === "<") {
        const moved = MoveSides(grid, block, topLeft, -1);
        if (moved) topLeft[0]--;
      } else {
        const moved = MoveSides(grid, block, topLeft, 1);
        if (moved) topLeft[0]++;
      }
      jet++;
      movedDown = MoveDown(grid, block, topLeft);
      if (movedDown) {
        topLeft[1]--;
      }
    } while (movedDown);
    SettleBlock(grid, block, topLeft);
  }

  return [part1, 0];
};
