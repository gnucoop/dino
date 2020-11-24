import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
  Key,
} from 'protractor';

describe('dewco-search-filters-widget', () => {
  beforeAll(async () => {
    await browser.get('/mat-list');

    const dialogButton = element(by.cssContainingText('mat-icon', 'filter_list'));
    await browser.wait(EC.elementToBeClickable(dialogButton), 1000);
    await dialogButton.click();
    await browser.sleep(300);
  });

  it('should display a number of dewco-search-filters-widget components', async () => {
    const widgets = element.all(by.tagName('dewco-search-filters-widget'));
    const widgetsCount = await widgets.count();
    const firstWidget = widgets.get(0);

    expect(widgetsCount).toBeGreaterThan(0);
    expect(await firstWidget.isPresent()).toBe(true);
  });

  it('should display the correct widget label', async () => {
    const firstWidgetLabel = element.all(by.css('.mat-card-content > label')).first();

    expect(await firstWidgetLabel.isPresent()).toBe(true);
    expect(await firstWidgetLabel.isDisplayed()).toBe(true);
    expect(await firstWidgetLabel.getText()).toEqual('Name');
  });

  it('should display a mat-slide-toggle in disabled state', async () => {
    const firstWidgetToggle = element.all(by.tagName('mat-slide-toggle')).first();

    expect(await firstWidgetToggle.isPresent()).toBe(true);
    expect(await firstWidgetToggle.isDisplayed()).toBe(true);
    expect(await firstWidgetToggle.getAttribute('ng-reflect-disabled')).toBe('true');
  });

  it('should display a mat-input', async () => {
    const firstWidgetInput = element.all(by.css('.mat-card-content input')).first();

    expect(await firstWidgetInput.isPresent()).toBe(true);
    expect(await firstWidgetInput.isDisplayed()).toBe(true);
  });

  it('should show an operator toggle-group in case of a Number filter, selecting "==" by default',
     async () => {
       const secondTab = element.all(by.css('.mat-tab-label')).get(1);
       await secondTab.click();
       await browser.sleep(300);

       const firstNumberWidget = element.all(by.css('.mat-card-content input[type=number]'))
                                     .first()
                                     .element(by.xpath('ancestor::dewco-search-filters-widget'));

       expect(await firstNumberWidget.getTagName()).toBe('dewco-search-filters-widget');

       const operatorToggleGroup = firstNumberWidget.element(by.tagName('mat-button-toggle-group'));

       expect(await operatorToggleGroup.isPresent()).toBe(true);
       expect(await operatorToggleGroup.isDisplayed()).toBe(true);

       const selectedOperator =
           await operatorToggleGroup.all(by.css('.mat-button-toggle-checked')).first().getText();

       expect(selectedOperator).toEqual('==');
     });

  it('should show a toggle-group in case of a Multiple Choice filter, selecting "is" by default',
     async () => {
       const tabLabels = element.all(by.css('.mat-tab-labels .mat-tab-label')).get(1);
       await tabLabels.click();
       await browser.sleep(300);

       const firstChoiceWidget = element.all(by.css('.mat-card-content ajf-checkbox-group'))
                                     .first()
                                     .element(by.xpath('ancestor::dewco-search-filters-widget'));

       expect(await firstChoiceWidget.isPresent()).toBe(true);

       const operatorToggleGroup = firstChoiceWidget.element(by.tagName('mat-button-toggle-group'));

       expect(await operatorToggleGroup.isPresent()).toBe(true);
       expect(await operatorToggleGroup.isDisplayed()).toBe(true);

       const selectedOperator =
           await operatorToggleGroup.all(by.css('.mat-button-toggle-checked')).first().getText();

       expect(selectedOperator).toEqual('is');
     });

  it('should check the mat-toggle when the input has a valid value', async () => {
    const tabLabels = element.all(by.css('.mat-tab-labels .mat-tab-label')).first();
    await tabLabels.click();
    await browser.sleep(300);

    const widget = element.all(by.tagName('dewco-search-filters-widget')).first();
    const input = widget.element(by.css('.mat-input-element[type="text"]'));
    const toggle = widget.element(by.tagName('mat-slide-toggle'));

    expect(await toggle.getAttribute('class')).toContain('mat-disabled');

    await input.sendKeys('n');

    const toggleChecked = widget.element(by.tagName('mat-slide-toggle'));

    expect(await toggleChecked.getAttribute('class')).not.toContain('mat-disabled');
    expect(await toggleChecked.getAttribute('class')).toContain('mat-checked');
  });

  it('should uncheck and disable the mat-toggle when the input has not a valid value', async () => {
    const widget = element.all(by.tagName('dewco-search-filters-widget')).first();
    const input = widget.element(by.css('.mat-input-element[type="text"]'));
    const toggle = widget.element(by.tagName('mat-slide-toggle'));

    expect(await toggle.getAttribute('class')).toContain('mat-checked');

    await input.sendKeys(Key.BACK_SPACE);

    const toggleUnchecked = widget.element(by.tagName('mat-slide-toggle'));

    expect(await toggleUnchecked.getAttribute('class')).toContain('mat-disabled');
    expect(await toggleUnchecked.getAttribute('class')).not.toContain('mat-checked');
  });

  it('should disable the toggle if the input value is not validated', async () => {
    const secondTab = element.all(by.css('.mat-tab-label')).get(1);
    await secondTab.click();
    await browser.sleep(300);

    const input = element.all(by.css('.mat-card-content input[type=number]')).first();
    const widget = input.element(by.xpath('ancestor::dewco-search-filters-widget'));

    expect(await input.isDisplayed()).toBe(true);

    await input.sendKeys(6);

    const toggleChecked = widget.element(by.tagName('mat-slide-toggle'));

    expect(await toggleChecked.getAttribute('class')).not.toContain('mat-disabled');
    expect(await toggleChecked.getAttribute('class')).toContain('mat-checked');

    await input.sendKeys(Key.BACK_SPACE);

    expect(await toggleChecked.getAttribute('class')).toContain('mat-disabled');
  });
});
