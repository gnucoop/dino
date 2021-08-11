import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';


describe('dewco-search-filters-widget', () => {
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

  it('should display a number of dewco-search-filters-widget components', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element(by.tagName('mat-grid-tile'));

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.cssContainingText('mat-icon', 'filter_list'))));
    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton));
    await dialogButton.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-search-filters-widget'))));
    const widgets = element.all(by.tagName('dewco-search-filters-widget'));
    const widgetsCount = await widgets.count();
    const firstWidget = widgets.get(0);

    expect(widgetsCount).toBeGreaterThan(0);
    expect(await firstWidget.isPresent()).toBe(true);
  });

  it('should display a mat-slide-toggle in disabled state', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element(by.tagName('mat-grid-tile'));

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

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
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element(by.tagName('mat-grid-tile'));

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

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
