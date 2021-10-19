import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-create-form', () => {
  beforeAll(async () => await browser.get('/forms'));

  it('should enter a create form page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-collect'))));
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();

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
    expect(currentUrl).toContain('create-form');
  });

  it('should show a Metric selector', async () => {
    const metricSelector = element(by.tagName('dewco-form-metric-selector'));
    await browser.wait(EC.presenceOf(metricSelector));
    const isMetricSelectorPresent = await metricSelector.isPresent();
    expect(isMetricSelectorPresent).toEqual(true);
  });
});
