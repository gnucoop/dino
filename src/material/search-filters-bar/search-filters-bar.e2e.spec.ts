import {browser, by, element, ExpectedConditions as EC} from 'protractor';

const filterFieldCss = (field: string) =>
  `.dewco-filters-bar .mat-input-element[formcontrolname="${field}"]`;

describe('dewco-search-filters-bar', () => {
  beforeEach(async () => {
    await browser.get('/forms');
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();
  });

  it('should display a Filter Bar component and its filters', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-search-filters-bar'))));
    await browser.wait(EC.presenceOf(element(by.className('dewco-filters-bar'))));

    await browser.wait(EC.presenceOf(element(by.css(filterFieldCss('dateStart')))));
    await browser.wait(EC.presenceOf(element(by.css(filterFieldCss('dateEnd')))));
    await browser.wait(EC.presenceOf(element(by.css(filterFieldCss('keyword')))));
    const dialogButton = await element(by.cssContainingText('mat-icon', 'filter_list')).isPresent();
    expect(dialogButton).toBe(true);
  });

  it('should change the displayed rows and the url on toolbar filters keydown', async () => {
    await browser.wait(EC.presenceOf(element(by.css(filterFieldCss('keyword')))));
    const initialUrl = await browser.getCurrentUrl();
    const keywords = element(by.css(filterFieldCss('keyword')));
    expect(await keywords.isPresent()).toBe(true);
    await keywords.sendKeys('123456789');

    await browser.wait(EC.not(EC.presenceOf(element(by.css('.mat-row')))));

    const finalUrl = await browser.getCurrentUrl();
    expect(finalUrl).not.toEqual(initialUrl);
    expect(finalUrl).toContain('?filters=');
  });

  it('should open the advanced filters dialog', async () => {
    await browser.wait(EC.not(EC.presenceOf(element(by.tagName('dewco-search-filters-dialog')))));

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton));
    await dialogButton.click();

    const dialog_open = await element(by.tagName('dewco-search-filters-dialog')).isPresent();
    expect(dialog_open).toBe(true);
  });
});
