import {
  browser,
  by,
  element,
} from 'protractor';

describe('dewco-mat-list', () => {
  beforeEach(async () => await browser.get('/mat-list'));

  it('should display a material table', async (done) => {
    const table = element(by.className('mat-table'));
    expect(await table.isPresent()).toBe(true);
    done();
  });
});
