import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('dino-columns-selector', () => {
  beforeEach(async () => {
    await browser.get('/forms');
    await browser.wait(EC.presenceOf(element(by.tagName('dino-collect'))));
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();
  });

  it('should display the column selector button', async () => {
    const colButton = element(by.css('.mat-list-icon.dino-columns-sel-btn'));
    expect(await colButton.isDisplayed()).toBe(true);
  });

  it('should open the column selector', async () => {
    const colButton = element(by.css('.mat-list-icon.dino-columns-sel-btn'));
    await browser.wait(EC.presenceOf(colButton));
    await colButton.click();

    const colSelector = element(by.tagName('dino-columns-selector'));
    await browser.wait(EC.presenceOf(colSelector));
    expect(await colSelector.isDisplayed()).toBe(true);
  });

  it('should filter the available columns in the selector', async () => {
    const colButton = element(by.css('.mat-list-icon.dino-columns-sel-btn'));
    await browser.wait(EC.presenceOf(colButton));
    await colButton.click();

    const colSelector = element(by.tagName('dino-columns-selector'));
    await browser.wait(EC.presenceOf(colSelector));

    const columnTogglesCount = await element.all(by.css('.dino-column-selector')).count();
    const filterInput = colSelector.element(by.css('.mat-input-element'));
    await browser.wait(EC.presenceOf(filterInput));
    await filterInput.sendKeys('age');
    const columnTogglesCountFiltered = await element.all(by.css('.dino-column-selector')).count();

    expect(columnTogglesCountFiltered).toBeLessThan(columnTogglesCount);
    expect(columnTogglesCountFiltered).toEqual(2);
  });
});
