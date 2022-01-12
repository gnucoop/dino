import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('dino-form-metric-selector', () => {
  beforeEach(async () => await browser.get('/forms'));

  it('should enter a form-metric-selector page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dino-collect'))));
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dino-list'))));

    await browser.wait(EC.presenceOf(element(by.tagName('mat-row'))));
    const matRow = element.all(by.tagName('mat-row')).get(0);

    await browser.actions().mouseMove(matRow).perform();

    await browser.wait(
      EC.presenceOf(element(by.css('.mat-cell.dino-row-actions .mat-icon.mat-list-icon'))),
    );

    const actionIcons = element.all(by.css('.mat-cell.dino-row-actions .mat-icon.mat-list-icon'));
    const editIcon = actionIcons.get(0);

    await browser.wait(editIcon.isDisplayed());
    await browser.actions().mouseMove(editIcon).perform();
    await browser.wait(EC.elementToBeClickable(editIcon));
    await editIcon.click();

    const currentUrl = await browser.getCurrentUrl();
    await browser.wait(EC.presenceOf(element(by.tagName('mat-stepper'))));
    await browser.wait(EC.presenceOf(element(by.className('dino-edit-form-step-container'))));
    const dinoFormMetricSelector = element.all(by.tagName('dino-form-metric-selector')).first();
    const isPresent = await dinoFormMetricSelector.isPresent();
    expect(currentUrl).toContain('edit-form');
    expect(isPresent).toBe(true);
  });
});
