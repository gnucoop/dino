import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('dino-search-filters-dialog', () => {
  beforeEach(async () => {
    await browser.get('/forms');
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();
  });

  it('should display a dino-search-filters-dialog component and its parts', async () => {
    await browser.wait(EC.presenceOf(element(by.cssContainingText('mat-icon', 'filter_list'))));

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton));
    await dialogButton.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dino-search-filters-dialog'))));

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
    await browser.wait(EC.presenceOf(element(by.cssContainingText('mat-icon', 'filter_list'))));

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton));
    await dialogButton.click();

    await browser.wait(EC.presenceOf(element(by.css('.mat-tab-label[role="tab"]'))));

    const firstTab = element(by.css('.mat-tab-label[role="tab"]'));
    const selected = await firstTab.getAttribute('aria-selected');
    expect(selected).toEqual('true');
  });

  it('should display some number of filter widgets in the selected tab', async () => {
    await browser.wait(EC.presenceOf(element(by.cssContainingText('mat-icon', 'filter_list'))));

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton));
    await dialogButton.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dino-search-filters-widget'))));

    const widgets = await element.all(by.tagName('dino-search-filters-widget')).count();
    expect(widgets).toBeGreaterThan(0);
  });

  it('should close the dialog and change the url with filter params when clicking Search button', async () => {
    await browser.wait(EC.presenceOf(element(by.cssContainingText('mat-icon', 'filter_list'))));

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton));
    await dialogButton.click();
    await browser.sleep(1000);

    await browser.wait(
      EC.presenceOf(element(by.cssContainingText('.mat-button-wrapper', 'Search'))),
    );

    const initialUrl = await browser.getCurrentUrl();
    const searchButton = element(by.cssContainingText('.mat-button-wrapper', 'Search')).element(
      by.xpath('..'),
    );
    const firstWidgeRadioBtn = element.all(by.css('.mat-card-content .mat-radio-button')).first();

    expect(await firstWidgeRadioBtn.isDisplayed()).toBe(true);

    await browser.wait(EC.elementToBeClickable(firstWidgeRadioBtn));
    await firstWidgeRadioBtn.click();
    await browser.sleep(1000);
    await searchButton.click();
    await browser.sleep(300);

    await browser.wait(EC.not(EC.presenceOf(element(by.tagName('dino-search-filters-dialog')))));

    await browser.sleep(1000);
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).not.toEqual(initialUrl);
  });
});
