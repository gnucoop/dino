import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-search-filters-dialog', () => {
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

  it('should display a dewco-search-filters-dialog component and its parts', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();
    await browser.sleep(1000);

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton), 1000);
    await dialogButton.click();
    await browser.sleep(1000);

    const dialog = await element(by.tagName('dewco-search-filters-dialog')).isPresent();
    expect(dialog).toBe(true);

    const search = await element(by.cssContainingText('.mat-button-wrapper', 'Search')).isPresent();
    const close = await element(by.cssContainingText('.mat-button-wrapper', 'Close')).isPresent();

    expect(search).toBe(true);
    expect(close).toBe(true);

    const matTab = await element(by.tagName('mat-dialog-content'))
                       .element(by.tagName('mat-tab-group'))
                       .isPresent();
    expect(matTab).toBe(true);
  });

  it('should select the first tab by default', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();
    await browser.sleep(1000);

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton), 1000);
    await dialogButton.click();
    await browser.sleep(1000);

    const matTabs = element.all(by.tagName('.mat-tab-label[role="tab"]'));
    const firstTab = matTabs.first();
    const selected = await firstTab.getAttribute('aria-selected');
    expect(selected).toEqual('true');
  });

  it('should display some number of filter widgets in the selected tab', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();
    await browser.sleep(1000);

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton), 1000);
    await dialogButton.click();
    await browser.sleep(1000);

    const widgets = await element.all(by.tagName('dewco-search-filters-widget')).count();
    expect(widgets).toBeGreaterThan(0);
  });

  it('should close the dialog and change the url with filter params when clicking Search button',
     async () => {
       const gridTiles = await element.all(by.tagName('mat-grid-tile'));
       const tile = gridTiles[0];

       await browser.wait(EC.elementToBeClickable(tile), 1000);
       await tile.click();
       await browser.sleep(1000);

       const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
       await browser.wait(EC.elementToBeClickable(dialogButton), 1000);
       await dialogButton.click();
       await browser.sleep(1000);

       const initialUrl = await browser.getCurrentUrl();
       const searchButton =
           element(by.cssContainingText('.mat-button-wrapper', 'Search')).element(by.xpath('..'));
       const firstWidgetInput = element.all(by.css('.mat-card-content input')).first();

       expect(await firstWidgetInput.isDisplayed()).toBe(true);

       await firstWidgetInput.sendKeys('en');
       await browser.sleep(300);
       await searchButton.click();
       await browser.sleep(300);

       const dialog = await element(by.tagName('dewco-search-filters-dialog')).isPresent();
       expect(dialog).toBe(false);

       const currentUrl = await browser.getCurrentUrl();

       expect(currentUrl).not.toEqual(initialUrl);
     });
});
