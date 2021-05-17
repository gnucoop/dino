import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-material-collect', () => {
  beforeEach(async () => await browser.get('/list'));
});
