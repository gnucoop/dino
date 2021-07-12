import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';


describe('dewco-search-filters-widget', () => {
  beforeEach(async () => {
    await browser.get('/collect');
  });

  it('should display a Dewco collect component', async () => {
    const collect = await element(by.tagName('dewco-collect')).isPresent();
    expect(collect).toBe(true);
  });

  it('should display one or more Grid Tiles', async () => {
    const tilesCount = await element.all(by.tagName('mat-grid-tile')).count();
    expect(tilesCount).toBeGreaterThan(0);
  });

  it('should display a number of dewco-search-filters-widget components', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();
    await browser.sleep(1000);

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton), 1000);
    await dialogButton.click();
    await browser.sleep(1000);

    const widgets = element.all(by.tagName('dewco-search-filters-widget'));
    const widgetsCount = await widgets.count();
    const firstWidget = widgets.get(0);

    expect(widgetsCount).toBeGreaterThan(0);
    expect(await firstWidget.isPresent()).toBe(true);
  });

  it('should display a mat-slide-toggle in disabled state', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();
    await browser.sleep(1000);

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton), 1000);
    await dialogButton.click();
    await browser.sleep(1000);

    const firstWidgetToggle = element.all(by.tagName('mat-slide-toggle')).first();

    expect(await firstWidgetToggle.isPresent()).toBe(true);
    expect(await firstWidgetToggle.isDisplayed()).toBe(true);
    expect(await firstWidgetToggle.getAttribute('class')).toMatch('mat-disabled');
  });

  it('should display a mat-input', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();
    await browser.sleep(1000);

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton), 1000);
    await dialogButton.click();
    await browser.sleep(1000);

    const firstWidgetInput = element.all(by.css('.mat-card-content input')).first();

    expect(await firstWidgetInput.isPresent()).toBe(true);
    expect(await firstWidgetInput.isDisplayed()).toBe(true);
  });
});
