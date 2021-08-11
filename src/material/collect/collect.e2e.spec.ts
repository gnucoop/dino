import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-collect', () => {
  beforeEach(async () => await browser.get('/collect'));

  it('should display a Dewco collect component', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-collect'))));
    const collect = await element(by.tagName('dewco-collect')).isPresent();
    expect(collect).toBe(true);
  });

  it('should display one or more Grid Tiles', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tilesCount = await element.all(by.tagName('mat-grid-tile')).count();
    expect(tilesCount).toBeGreaterThan(0);
  });

  it('should enter a form list page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element(by.tagName('mat-grid-tile'));

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-list'))));
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('list');
  });
});

describe('dewco-collect-dashboard', () => {
  beforeEach(async () => await browser.get('/dashboard'));

  it('should display a Dewco collect component', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-collect'))));
    const collect = await element(by.tagName('dewco-collect')).isPresent();
    expect(collect).toBe(true);
  });

  it('should display one or more Grid Tiles', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tilesCount = await element.all(by.tagName('mat-grid-tile')).count();
    expect(tilesCount).toBeGreaterThan(0);
  });

  it('should enter a form collect page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element(by.tagName('mat-grid-tile'));

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-collect'))));
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('collect');
  });
});
