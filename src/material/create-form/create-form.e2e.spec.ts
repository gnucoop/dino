import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('dino-create-form', () => {
  beforeAll(async () => await browser.get('/forms'));

  it('should enter a create form page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dino-collect'))));
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dino-list'))));

    await browser.wait(EC.presenceOf(element(by.css('dino-floating-button button'))));
    const addFormButton = element.all(by.css('dino-floating-button button')).get(0);

    await browser.actions().mouseMove(addFormButton).perform();
    await browser.wait(EC.elementToBeClickable(addFormButton));
    await browser.actions().click().perform();

    await browser.wait(EC.presenceOf(element(by.tagName('dino-create-form'))));
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('create');
    expect(currentUrl).toContain('form');
  });

  it('should show a Metric selector', async () => {
    const metricSelector = element(by.tagName('dino-form-metric-selector'));
    await browser.wait(EC.presenceOf(metricSelector));
    const isMetricSelectorPresent = await metricSelector.isPresent();
    expect(isMetricSelectorPresent).toEqual(true);
  });
});
