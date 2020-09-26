import * as chai from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import { parseImage } from '../server/imageParser';
import { cleanupText } from '../server/recipeParser';

const expect = chai.expect;

describe('parseImage', () => {
  describe('test_image.jpg', () => {
    const img = 'data:image/jpg;base64,' + fs.readFileSync(path.resolve('tests/test_image.jpg'), 'base64');
    let text = '';
    it('should parse without erroring', async () => {
      //   console.log('>>>>>>>', img);
      return parseImage(img)
        .then(function (res) {
          expect(res).to.be.a('string');
          expect(res.split('\n')).to.have.length(11);
          text = res;
        })
        .catch(function (m) {
          throw new Error('was not supposed to fail');
        });
    }).timeout(60000);
    it('should make and array and remove empty strings', () => {
      const arr = cleanupText(text);
      expect(arr).to.be.an('array');
      expect(arr).to.have.length(10);
    });
  });
});
