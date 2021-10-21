import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('dino-search-filters-widget', () => {
  beforeEach(async () => {
    await browser.get('/forms');
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();
  });

  it('should display a number of dino-search-filters-widget components', async () => {
    await browser.wait(EC.presenceOf(element(by.cssContainingText('mat-icon', 'filter_list'))));
    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton));
    await dialogButton.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dino-search-filters-widget'))));
    const widgets = element.all(by.tagName('dino-search-filters-widget'));
    const widgetsCount = await widgets.count();
    const firstWidget = widgets.get(0);

    expect(widgetsCount).toBeGreaterThan(0);
    expect(await firstWidget.isPresent()).toBe(true);
  });

  it('should display a mat-slide-toggle in disabled state', async () => {
    await browser.wait(EC.presenceOf(element(by.cssContainingText('mat-icon', 'filter_list'))));
    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton));
    await dialogButton.click();

    await browser.wait(EC.presenceOf(element(by.tagName('mat-slide-toggle'))));
    const firstWidgetToggle = element(by.tagName('mat-slide-toggle'));

    expect(await firstWidgetToggle.isPresent()).toBe(true);
    expect(await firstWidgetToggle.isDisplayed()).toBe(true);
    expect(await firstWidgetToggle.getAttribute('class')).toMatch('mat-disabled');
  });

  it('should display a mat-input', async () => {
    await browser.wait(EC.presenceOf(element(by.cssContainingText('mat-icon', 'filter_list'))));
    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton));
    await dialogButton.click();

    await browser.wait(EC.presenceOf(element(by.css('.mat-card-content input'))));
    const firstWidgetInput = element(by.css('.mat-card-content input'));

    expect(await firstWidgetInput.isPresent()).toBe(true);
    expect(await firstWidgetInput.isDisplayed()).toBe(true);
  });
});
