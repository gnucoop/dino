import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-edit-form', () => {
  beforeEach(async () => await browser.get('/collect'));

  it('should display one or more Grid Tiles', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-collect'))));
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tilesCount = await element.all(by.tagName('mat-grid-tile')).count();
    expect(tilesCount).toBeGreaterThan(0);
  });

  it('should enter an edit form page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element(by.tagName('mat-grid-tile'));

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-list'))));

    await browser.wait(EC.presenceOf(element(by.tagName('mat-row'))));
    const matRow = element.all(by.tagName('mat-row')).get(0);

    await browser.actions().mouseMove(matRow).perform();

    await browser.wait(EC.presenceOf(element(by.css
      ('.mat-cell.dewco-row-actions .mat-icon.mat-list-icon'))));

    const actionIcons = element.all(by.css('.mat-cell.dewco-row-actions .mat-icon.mat-list-icon'));
    const editIcon = actionIcons.get(1);

    await browser.actions().mouseMove(editIcon).perform();
    await browser.wait(EC.elementToBeClickable(editIcon));
    await browser.actions().click().perform();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-edit-form'))));
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('edit');
  });
});
