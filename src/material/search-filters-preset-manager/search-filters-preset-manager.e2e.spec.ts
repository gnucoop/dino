import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
  Key,
} from 'protractor';

describe('dewco-search-filters-preset-manager', () => {
  beforeEach(async () => await browser.get('/collect'));

  it('should display one or more Grid Tiles', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-collect'))));
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tilesCount = await element.all(by.tagName('mat-grid-tile')).count();
    expect(tilesCount).toBeGreaterThan(0);
  });

  it('should display a dewco-search-filters-preset-manager component', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element(by.tagName('mat-grid-tile'));

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-search-filters-preset-manager'))));
    const presetManager = element(by.tagName('dewco-search-filters-preset-manager'));

    expect(await presetManager.isPresent()).toBe(true);
    expect(await presetManager.isDisplayed()).toBe(true);
  });

  it('should disable apply/save buttons if preset is not valid or stored ', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element(by.tagName('mat-grid-tile'));

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-search-filters-preset-manager'))));
    const presetManager = element(by.tagName('dewco-search-filters-preset-manager'));
    const presetInput = presetManager.element(by.tagName('input'));
    const applyBtn = presetManager.all(by.tagName('button')).first();
    const saveBtn = presetManager.all(by.tagName('button')).last();

    expect(await presetInput.isPresent()).toBe(true);
    expect(await presetInput.isDisplayed()).toBe(true);

    await presetInput.sendKeys('test_preset');
    await browser.sleep(300);

    expect(await applyBtn.getAttribute('class')).toContain('mat-button-disabled');
    expect(await saveBtn.getAttribute('class')).toContain('mat-button-disabled');
    await presetInput.clear();
  });

  it('should save or update a preset in the localStorage', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element(by.tagName('mat-grid-tile'));

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-search-filters-preset-manager'))));
    const presetManager = element(by.tagName('dewco-search-filters-preset-manager'));
    const presetInput = presetManager.element(by.tagName('input'));
    const saveBtn = presetManager.all(by.tagName('button')).last();
    const keywordFilterInput = element(by.css('input[formcontrolname="keyword"]'));
    const getScript = 'return window.localStorage.getItem(\'filters_preset_custom\');';

    expect(await browser.executeScript(getScript)).toBeNull();
    await keywordFilterInput.sendKeys('t');
    await browser.sleep(300);

    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('?filters=');
    const presetString = currentUrl.split('?filters=')[1];
    expect(currentUrl).toContain(presetString);

    await presetInput.sendKeys('custom');
    await browser.sleep(300);

    expect(await saveBtn.getAttribute('class')).not.toContain('mat-button-disabled');

    await browser.wait(EC.elementToBeClickable(saveBtn));
    await saveBtn.click();
    await browser.sleep(300);

    const item = await browser.executeScript(getScript);

    expect(item).not.toBeNull();

    await keywordFilterInput.sendKeys(Key.BACK_SPACE);
    await browser.sleep(300);
    await presetInput.clear();
  });

  it('should load a preset from the localStorage', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element(by.tagName('mat-grid-tile'));

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dewco-search-filters-preset-manager'))));
    const presetManager = element(by.tagName('dewco-search-filters-preset-manager'));
    const presetInput = presetManager.element(by.tagName('input'));
    const applyBtn = presetManager.all(by.tagName('button')).first();
    const keywordFilterInput = element(by.css('input[formcontrolname="keyword"]'));

    expect(await browser.getCurrentUrl()).not.toContain('?filters=');
    expect(await keywordFilterInput.getAttribute('value')).toEqual('');
    expect(await applyBtn.getAttribute('class')).toContain('mat-button-disabled');

    await presetInput.sendKeys('c');
    const autocompletePanel = element(by.className('mat-autocomplete-panel'));

    expect(await autocompletePanel.isDisplayed()).toBe(true);

    const autocompleteFirstOption = autocompletePanel.all(by.tagName('mat-option')).first();

    expect(await autocompleteFirstOption.getText()).toEqual('custom');

    await browser.wait(EC.elementToBeClickable(autocompleteFirstOption));
    await autocompleteFirstOption.click();
    await browser.sleep(300);

    expect(await presetInput.getAttribute('value')).toEqual('custom');

    await browser.wait(EC.elementToBeClickable(applyBtn));
    await applyBtn.click();
    await browser.sleep(300);

    expect(await browser.getCurrentUrl()).toContain('?filters=');
    expect(await keywordFilterInput.getAttribute('value')).toEqual('t');
  });
});
