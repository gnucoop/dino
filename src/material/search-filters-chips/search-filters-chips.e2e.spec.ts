import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-search-filters-chips', () => {
  beforeAll(async () => {
    await browser.get('/list');

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton), 2000);
    await dialogButton.click();
  });

  beforeEach(async () => {
    await browser.sleep(300);
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
    expect(await addedChips.first().getText()).toContain('NAME');
  });

  it('should remove a chip and exclude the associated filter widget', async () => {
    const chips = element(by.css('dewco-search-filters-dialog dewco-search-filters-chips'));
    const activeChip = chips.all(by.css('dewco-search-filters-dialog mat-chip')).first();

    await activeChip.element(by.tagName('i')).click();
    await browser.sleep(300);

    const widgetToggle = element.all(by.tagName('dewco-search-filters-widget'))
                             .first()
                             .element(by.tagName('mat-slide-toggle'));

    expect(await widgetToggle.getAttribute('class')).not.toContain('mat-checked');
  });
});
