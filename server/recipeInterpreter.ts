import { RecipeLineModel, WordToken } from '../types';
import { CONJUNCTIONS } from './keywords';
import { UNITS } from './units';

export const NUMERIC_RE = /[0-9]|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|dozen/i;

export const cleanupText = (raw: string): string[] => {
  return raw.split('\n').filter((item) => item.length > 0);
};

export const parseWord = (str: string): WordToken => {
  let type: string = null;
  let value: string = null;
  if (NUMERIC_RE.test(str)) {
    type = 'value';
    value = str.replace(/[^0-9/]/g, ' ');
  } else if (CONJUNCTIONS.includes(str)) {
    type = 'conjunction';
    value = str;
  } else if (UNITS.hasOwnProperty(str)) {
    type = 'unit';
    value = UNITS[str];
  } else {
    type = 'subject';
    value = str;
  }

  return {
    type,
    value,
    raw: str,
  };
};

export const parseRecipeLine = (line: string): RecipeLineModel[] => {
  const split_on_space = line.split(' ');
  let acc = [];
  let i = 0;
  while (i < split_on_space.length) {
    const item = split_on_space[i];
    const parsed = parseWord(item);
    if (parsed.type === 'conjunction') {
      const split = line.split(` ${parsed.value} `).map((item) => parseRecipeLine(item));
      acc = [parsed.value, split];
      break;
    } else {
      acc.push(parsed);
    }
    i++;
  }
  return acc;
};

// test for none unit start lines
//
export const handleMultiLineItems = (arr: string[]): string[] => {
  return arr.reduce((acc, item, i) => {
    if (!NUMERIC_RE.test(item)) {
      if (acc.length) {
        const prev = acc[acc.length - 1];
        acc[acc.length - 1] = prev + item;
      }
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
};

export const parseRawTextArray = (raw: string[]): RecipeLineModel[][] => {
  const reduced = handleMultiLineItems(raw);
  return reduced.map((l) => parseRecipeLine(l));
};

export function testConsecutive(arr: number[]): boolean {
  return arr.every((item, i) => (typeof item !== 'number' ? false : i === 0 ? true : item - arr[i - 1] === 1));
}
