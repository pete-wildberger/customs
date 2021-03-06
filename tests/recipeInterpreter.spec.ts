import * as chai from 'chai';
import { readFileSync } from 'fs';
import * as path from 'path';
import {
  cleanupText,
  handleMultiLineItems,
  NUMERIC_RE,
  testConsecutive,
  parseRawTextArray,
} from '../server/recipeInterpreter';

const expect = chai.expect;

describe('parseRecipe', () => {
  describe('testConsecutive', () => {
    it('should return true for an array of consecutive numbers', () => {
      const consec = [1, 2, 3];
      expect(testConsecutive(consec)).to.be.true;
    });
    it('should return false for an array of non-consecutive numbers', () => {
      const nonconsec = [10, 2, 6];
      expect(testConsecutive(nonconsec)).to.be.false;
    });
  });
  describe('well_cropped.jpg', () => {
    const raw_image_text = readFileSync(path.resolve('tests/data/well_cropped.txt')).toString();
    describe('cleanupText', () => {
      const arr = cleanupText(raw_image_text);
      it('should make and array', () => {
        expect(arr).to.be.an('array');
      });
      it('should remove one empty string', () => {
        expect(arr).to.have.length(10);
      });
    });
    describe('handleMultiLineItems', () => {
      const clean = cleanupText(raw_image_text);
      const arr = handleMultiLineItems(clean);
      it('should make every item contain a numberic', () => {
        expect(arr.every((i) => NUMERIC_RE.test(i))).to.be.true;
      });
      it('should concat one item and remove title line that do not start with a numeric', () => {
        expect(arr).to.be.an('array');
        expect(arr).to.have.length(8);
      });
    });
    describe('parseRecipeLine', () => {
      const clean = cleanupText(raw_image_text);
      const arr = parseRawTextArray(clean);
      console.log(arr);
      it('should make every item have 3 keys', () => {
        expect(arr.every((i) => Object.keys(i).length === 3)).to.be.true;
      });
      // xit('should make the value property start with a numeric', () => {
      //   expect(arr.every((i) => numericStartRE.test(i.value))).to.be.true;
      // });
    });
  });
});
