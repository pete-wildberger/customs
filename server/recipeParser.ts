import { RecipeLineModel, WordSlugModel } from '../types';
import { CONJUNCTIONS } from './keywords';
import { UNITS } from './units';

export const numericStartRE = /^[0-9]|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|dozen/i;

export const cleanupText = (raw: string): string[] => {
  return raw.split('\n').filter((item) => item.length > 0);
};

export const parseWord = (str: string): WordSlugModel => {
  let type: string = null;
  let data: string = null;
  if (numericStartRE.test(str)) {
    type = 'value';
    data = str.replace(/[^0-9/]/g, ' ');
  } else if (CONJUNCTIONS.includes(str)) {
    type = 'conjunction';
    data = str;
  } else if (UNITS.hasOwnProperty(str)) {
    type = 'unit';
    data = UNITS[str];
  } else {
    type = 'subject';
    data = str;
  }

  return {
    type,
    data,
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
      const split = line.split(` ${parsed.data} `).map((item) => parseRecipeLine(item));
      acc = split;
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
    if (!numericStartRE.test(item)) {
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
  return reduced.reduce((acc, l) => {
    const parsed = parseRecipeLine(l);

    if (Array.isArray(parsed[0])) {
      parsed.forEach((p) => acc.push(p));
    } else {
      acc.push(parsed);
    }
    return acc;
  }, []);
};

export function testConsecutive(arr: number[]): boolean {
  return arr.every((item, i) => (typeof item !== 'number' ? false : i === 0 ? true : item - arr[i - 1] === 1));
}
