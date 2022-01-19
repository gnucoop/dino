import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('dino-edit-form-schema', () => {
  beforeEach(async () => {
    await browser.get('/forms');
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();
    const tileActions = tile.element(by.className('dino-grid-action-icons'));
    const editButton = tileActions.element(by.tagName('button'));

    await browser.wait(EC.elementToBeClickable(editButton));
    await editButton.click();
  });

  it('should enter an edit form schema page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dino-edit-form-schema'))));
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('forms');
    expect(currentUrl).toContain('schema');
    expect(currentUrl).toContain('edit');
  });

  it('should show an Ajf Form Builder', async () => {
    const ajfFormBuilder = element(by.tagName('ajf-form-builder'));
    const formBuilderPresent = await ajfFormBuilder.isPresent();

    expect(formBuilderPresent).toEqual(true);
  });

  it('should show a form with all Form Schema basic attributes inputs', async () => {
    const ajfFormAttributes = element(by.className('dino-form-attributes'));
    const formAttributesDisplayed = await ajfFormAttributes.isDisplayed();

    expect(formAttributesDisplayed).toEqual(true);
  });
});
