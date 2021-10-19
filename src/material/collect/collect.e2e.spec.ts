import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco forms collect', () => {
  beforeEach(async () => await browser.get('/forms'));

  it('should display one or more Grid Tiles', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-collect'))));
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tilesCount = await element.all(by.tagName('mat-grid-tile')).count();
    expect(tilesCount).toBeGreaterThan(0);
  });

  it('should enter a form list page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-list'))));
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('form-list');
  });
});

describe('dewco reports collect', () => {
  beforeEach(async () => await browser.get('/reports'));

  it('should display one or more Grid Tiles', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-collect'))));
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tilesCount = await element.all(by.tagName('mat-grid-tile')).count();
    expect(tilesCount).toBeGreaterThan(0);
  });

  it('should enter a report list page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-list'))));
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('report-list');
  });
});
