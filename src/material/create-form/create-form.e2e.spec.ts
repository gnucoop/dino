import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-create-form', () => {
  beforeEach(async () => await browser.get('/collect'));

  it('should enter a create form page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-collect'))));
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element(by.tagName('mat-grid-tile'));

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-list'))));

    await browser.wait(EC.presenceOf(element(by.css('dewco-floating-button button'))));
    const addFormButton = element.all(by.css('dewco-floating-button button')).get(0);

    await browser.actions().mouseMove(addFormButton).perform();
    await browser.wait(EC.elementToBeClickable(addFormButton));
    await browser.actions().click().perform();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-create-form'))));
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('create');
  });
});
