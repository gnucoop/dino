import {
  $,
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-search-filters-bar', () => {
  beforeEach(async () => await browser.get('/mat-list'));

  it('should display a Filter Bar component', async () => {
    const bar = await element(by.tagName('dewco-search-filters-bar')).isPresent();
    expect(bar).toBe(true);
  });

  it('should display a filters toolbar', async () => {
    const toolbar = await element(by.className('toolbar')).isPresent();
    expect(toolbar).toBe(true);
  });

  it('should display Date and Keywords filters in the toolbar', async () => {
    const dateFrom =
        await $('.toolbar .mat-input-element[formcontrolname="dateStart"]').isPresent();
    const dateTo = await $('.toolbar .mat-input-element[formcontrolname="dateEnd"]').isPresent();
    const keywords = await $('.toolbar .mat-input-element[formcontrolname="keyword"]').isPresent();

    expect(dateFrom).toBe(true);
    expect(dateTo).toBe(true);
    expect(keywords).toBe(true);
  });

  it('should change the displayed rows and the url on toolbar filters keydown', async () => {
    const initialUrl = await browser.getCurrentUrl();
    const keywords = $('.toolbar .mat-input-element[formcontrolname="keyword"]');
    await keywords.sendKeys('en');
    await browser.sleep(300);

    const filteredRowsCount = await element.all(by.tagName('mat-row')).count();
    expect(filteredRowsCount).toEqual(1);

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
