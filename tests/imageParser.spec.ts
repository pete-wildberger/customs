import * as chai from 'chai';
import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import { parseImage } from '../server/imageParser';

const expect = chai.expect;

describe('parseImage', () => {
  xdescribe('well_cropped.jpg', () => {
    const img = 'data:image/jpg;base64,' + readFileSync(path.resolve('tests/data/well_cropped.jpg'), 'base64');
    it('should parse without erroring', async () => {
      //   console.log('>>>>>>>', img);
      return parseImage(img)
        .then(function (res) {
          expect(res).to.be.a('string');
          expect(res.split('\n')).to.have.length(11);
          writeFileSync('tests/data/well_cropped.txt', res);
        })
        .catch(function (m) {
          throw new Error('was not supposed to fail');
        });
    }).timeout(120000);
  });
  describe('longer_cropped.jpg', () => {
    const img = 'data:image/jpg;base64,' + readFileSync(path.resolve('tests/data/longer_cropped.jpg'), 'base64');
    it('should parse without erroring', async () => {
      //   console.log('>>>>>>>', img);
      return parseImage(img)
        .then(function (res) {
          expect(res).to.be.a('string');
          writeFileSync('tests/data/longer_cropped.txt', res);
        })
        .catch(function (m) {
          console.log(m);
          throw new Error('was not supposed to fail');
        });
    }).timeout(120000);
  });
});
