import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateCombinations = (arrays: string[][]) => {
  let results: string[][] = [];

  const helper = (arr: any[], i: number): void => {
    if (i === arrays.length) {
      results.push(arr);
      return;
    }
    for (let j = 0; j < arrays[i].length; j++) {
      helper([...arr, arrays[i][j]], i + 1);
    }
  };

  helper([], 0);
  return results;
};
