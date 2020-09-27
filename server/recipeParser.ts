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
  const value_idxs = [];
  const unit = [];
  const label = [];
  split_on_space.forEach((item, i) => {
    const is_numeric = numericStartRE.test(item);
    if (is_numeric) {
      value_idxs.push(i);
    }
  });

  return [
    {
      value: value_idxs
        .map((item, i) => split_on_space[i])
        .join(' ')
        .replace(/[^0-9/]/g, ' '),
      unit: unit.join(' '),
      label: label.join(' '),
    },
  ];
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

export const parseRawTextArray = (raw: string[]): RecipeLineModel[] => {
  const reduced = handleMultiLineItems(raw);
  return reduced.map((l) => parseRecipeLine(l)).flat();
};

export function testConsecutive(arr: number[]): boolean {
  return arr.every((item, i) => (typeof item !== 'number' ? false : i === 0 ? true : item - arr[i - 1] === 1));
}
