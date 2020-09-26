import { RecipeLineModel } from '../types';

export const numericStartRE = /^[0-9]|one|two|three|four|five|six|seven|eight|nine/;

export const cleanupText = (raw: string): string[] => {
  return raw.split('\n').filter((item) => item.length > 0);
};

export const parseRecipeLine = (line: string): RecipeLineModel => {
  return;
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
  return;
};
