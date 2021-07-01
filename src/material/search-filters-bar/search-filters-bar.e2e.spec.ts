import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

const filterFieldCss = (field: string) =>
    `.dewco-filters-bar .mat-input-element[formcontrolname="${field}"]`;

describe('dewco-search-filters-bar', () => {
  beforeEach(async () => {
    await browser.get('/collect');
    const gridTile = element.all(by.tagName('mat-grid-tile')).first();

    await browser.wait(EC.elementToBeClickable(gridTile), 1000);
    await gridTile.click();
    await browser.sleep(1000);
  });

  it('should display a Filter Bar component', async () => {
    const bar = await element(by.tagName('dewco-search-filters-bar')).isPresent();
    expect(bar).toBe(true);
  });

  it('should display a filters toolbar', async () => {
    const toolbar = await element(by.className('dewco-filters-bar')).isPresent();
    expect(toolbar).toBe(true);
  });

  it('should display Date and Keywords filters in the toolbar', async () => {
    await browser.wait(EC.presenceOf(element(by.css(filterFieldCss('dateStart')))));
    await browser.wait(EC.presenceOf(element(by.css(filterFieldCss('dateEnd')))));
    await browser.wait(EC.presenceOf(element(by.css(filterFieldCss('keyword')))));
  });

  it('should change the displayed rows and the url on toolbar filters keydown', async () => {
    const initialUrl = await browser.getCurrentUrl();
    const keywords = element(by.css(filterFieldCss('keyword')));
    expect(await keywords.isPresent()).toBe(true);
    await keywords.sendKeys('123456789');
    await browser.sleep(3000);

    const filteredRowsCount = await element.all(by.css('.mat-row')).count();
    expect(filteredRowsCount).toEqual(0);

    const finalUrl = await browser.getCurrentUrl();
    expect(finalUrl).not.toEqual(initialUrl);
    expect(finalUrl).toContain('?filters=');
  });

  it('should display a button for opening the dialog/advanced filters', async () => {
    const dialogButton = await element(by.cssContainingText('mat-icon', 'filter_list')).isPresent();
    expect(dialogButton).toBe(true);
  });

  it('should open the advanced filters dialog', async () => {
    const dialog = await element(by.tagName('dewco-search-filters-dialog')).isPresent();
    expect(dialog).toBe(false);

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton), 1000);
    await dialogButton.click();

    const dialog_open = await element(by.tagName('dewco-search-filters-dialog')).isPresent();
    expect(dialog_open).toBe(true);
  });
});
