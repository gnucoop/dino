import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-search-filters-chips', () => {
  beforeAll(async () => {
    await browser.get('/collect');
    const gridTile = element.all(by.tagName('mat-grid-tile')).first();

    await browser.wait(EC.elementToBeClickable(gridTile), 1000);
    await gridTile.click();
    await browser.sleep(1000);

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton), 1000);
    await dialogButton.click();
    await browser.sleep(1000);
  });

  it('should find a dewco-search-filters-chips component', async () => {
    const chips = element(by.css('dewco-search-filters-dialog dewco-search-filters-chips'));

    expect(await chips.isPresent()).toBe(true);
  });

  it('should add a chip to the dewco-search-filters-chips component', async () => {
    const widget = element.all(by.tagName('dewco-search-filters-widget')).first();
    const input = widget.element(by.css('.mat-input-element[type="text"]'));

    await input.sendKeys('n');
    await browser.sleep(300);

    const chips = element(by.css('dewco-search-filters-dialog dewco-search-filters-chips'));
    expect(await chips.isDisplayed()).toBe(true);

    const addedChips = chips.all(by.css('dewco-search-filters-dialog mat-chip'));
    expect(await addedChips.count()).toEqual(1);
    expect(await addedChips.first().getText()).toContain('USER_ID');
  });

  it('should remove a chip and exclude the associated filter widget', async () => {
    const chips = element(by.css('dewco-search-filters-dialog dewco-search-filters-chips'));
    const activeChip = chips.all(by.css('dewco-search-filters-dialog mat-chip')).first();

    expect(await activeChip.isPresent()).toBe(true);

    await activeChip.element(by.css('.mat-chip-remove')).click();
    await browser.sleep(300);

    const widgetToggle = element.all(by.tagName('dewco-search-filters-widget'))
                             .first()
                             .element(by.tagName('mat-slide-toggle'));

    expect(await widgetToggle.getAttribute('class')).not.toContain('mat-checked');
  });
});
