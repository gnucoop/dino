import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('dewco-form-metric-selector', () => {
  beforeEach(async () => await browser.get('/forms'));

  it('should enter a form-metric-selector page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-list'))));

    await browser.wait(EC.presenceOf(element(by.tagName('mat-row'))));
    const matRow = element.all(by.tagName('mat-row')).get(0);

    await browser.actions().mouseMove(matRow).perform();

    await browser.wait(
      EC.presenceOf(element(by.css('.mat-cell.dewco-row-actions .mat-icon.mat-list-icon'))),
    );

    const actionIcons = element.all(by.css('.mat-cell.dewco-row-actions .mat-icon.mat-list-icon'));
    const editIcon = actionIcons.get(1);

    await browser.actions().mouseMove(editIcon).perform();
    await browser.wait(EC.elementToBeClickable(editIcon));
    await browser.actions().click().perform();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-form-metric-selector'))));
    const isPresent = await element(by.tagName('dewco-form-metric-selector')).isPresent();

    expect(isPresent).toBe(true);
  });
});
