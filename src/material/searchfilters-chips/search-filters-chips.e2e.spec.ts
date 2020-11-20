import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-searchfilters-chips', () => {
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

  it('should find a dewco-searchfilters-chips component', async () => {
    const chips = element(by.css('dewco-searchfilters-dialog dewco-searchfilters-chips'));

    expect(await chips.isPresent()).toBe(true);
    expect(await chips.isDisplayed()).toBe(false);
  });

  it('should add a chip to the dewco-searchfilters-chips component', async () => {
    const widget = element.all(by.tagName('dewco-searchfilters-widget')).first();
    const input = widget.element(by.css('.mat-input-element[type="text"]'));

    await input.sendKeys('n');
    await browser.sleep(1000);

    const chips = element(by.css('dewco-searchfilters-dialog dewco-searchfilters-chips'));
    expect(await chips.isDisplayed()).toBe(true);

    const addedChips = chips.all(by.css('dewco-searchfilters-dialog mat-chip'));
    expect(await addedChips.count()).toEqual(1);
    expect(await addedChips.first().getText()).toContain('NAME');
  });

  it('should remove a chip and exclude the associated filter widget', async () => {
    const chips = element(by.css('dewco-searchfilters-dialog dewco-searchfilters-chips'));
    const activeChip = chips.all(by.css('dewco-searchfilters-dialog mat-chip')).first();

    await activeChip.element(by.tagName('i')).click();
    await browser.sleep(1000);

    const widgetToggle = element.all(by.tagName('dewco-searchfilters-widget'))
                             .first()
                             .element(by.tagName('mat-slide-toggle'));

    expect(await widgetToggle.getAttribute('class')).not.toContain('mat-checked');
  });
});
