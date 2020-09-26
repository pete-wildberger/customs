import { RecipeLineModel } from '../types';

export const numericStartRE = /^[0-9]|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|dozen/i;

export const cleanupText = (raw: string): string[] => {
  return raw.split('\n').filter((item) => item.length > 0);
};

export const parseRecipeLine = (line: string): RecipeLineModel => {
  const split_on_space = line.split(' ');
  const value = [];
  const unit = [];
  const label = [];
  split_on_space.forEach((item, i) => {
    const is_numeric = numericStartRE.test(item);
    if (is_numeric) {
      value.push(item);
    } else if (!is_numeric && numericStartRE.test(split_on_space[i - 1])) {
      unit.push(item);
    } else {
      label.push(item);
    }
  });
  return {
    value: value.join(' ').replace(/[^0-9/]/g, ' '),
    unit: unit.join(' '),
    label: label.join(' '),
  };
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
  return reduced.map((l) => parseRecipeLine(l));
};
