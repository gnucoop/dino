import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-create-form', () => {
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

  it('should enter a create form page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element(by.tagName('mat-grid-tile'));

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-list'))));

    const actionIcons = element.all(by.css('.mat-cell.dewco-row-actions .mat-icon.mat-list-icon'));
    const createIcon = actionIcons.get(1);

    await browser.actions().mouseMove(createIcon).perform();
    await browser.wait(EC.elementToBeClickable(createIcon));
    await browser.actions().click().perform();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-create-form'))));
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('create');
  });
});
