import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-mat-searchfilters-dialog', () => {
  beforeAll(async () => {
    await browser.get('/mat-list');
    await browser.waitForAngularEnabled(false);

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton), 1000);
    await dialogButton.click();
  });

  beforeEach(async () => {
    await browser.sleep(1000);
  });

  it('should display a dewco-mat-searchfilters-dialog component', async () => {
    const dialog = await element(by.tagName('dewco-mat-searchfilters-dialog')).isPresent();
    expect(dialog).toBe(true);
  });

  it('should display a search button', async () => {
    const search = await element(by.cssContainingText('.mat-button-wrapper', 'search')).isPresent();
    expect(search).toBe(true);
  });

  it('should display a mat-tab-group inside the dialog content', async () => {
    const matTab = await element(by.tagName('mat-dialog-content'))
                       .element(by.tagName('mat-tab-group'))
                       .isPresent();
    expect(matTab).toBe(true);
  });

  it('should select the first tab by default', async () => {
    const matTabs = element.all(by.tagName('.mat-tab-label[role="tab"]'));
    const firstTab = matTabs.first();
    const selected = await firstTab.getAttribute('aria-selected');
    expect(selected).toEqual('true');
  });

  it('should display some number of filter widgets in the selected tab', async () => {
    const widgets = await element.all(by.tagName('dewco-mat-searchfilters-widget')).count();
    expect(widgets).toEqual(3);
    expect(widgets).toBeGreaterThan(0);
  });

  it('should close the dialog and change the url with filter params when clicking Search button',
     async () => {
       const initialUrl = await browser.getCurrentUrl();
       const searchButton =
           element(by.cssContainingText('.mat-button-wrapper', 'search')).element(by.xpath('..'));
       const firstWidgetInput = element.all(by.css('.mat-card-content input')).first();

       expect(await firstWidgetInput.isDisplayed()).toBe(true);

       await firstWidgetInput.sendKeys('en');
       await browser.sleep(1000);
       await searchButton.click();
       await browser.sleep(1000);

       const dialog = await element(by.tagName('dewco-mat-searchfilters-dialog')).isPresent();
       expect(dialog).toBe(false);

       const currentUrl = await browser.getCurrentUrl();

       expect(currentUrl).not.toEqual(initialUrl);
     });
});
