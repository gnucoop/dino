import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('dino-edit-report-schema', () => {
  beforeEach(async () => {
    await browser.get('/reports');
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();
    const tileActions = tile.element(by.className('dino-grid-action-icons'));
    const editButton = tileActions.element(by.tagName('button'));

    await browser.wait(EC.elementToBeClickable(editButton));
    await editButton.click();
  });

  it('should enter an edit report schema page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dino-edit-report-schema'))));
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('edit-report-schema');
  });

  it('should show a rendered Ajf Report Instance', async () => {
    const ajfReportInstance = element(by.tagName('ajf-report'));
    const ajfReportInstancePresent = await ajfReportInstance.isPresent();

    expect(ajfReportInstancePresent).toEqual(true);
  });

  it('should show a form with all Report Schema basic attributes inputs', async () => {
    const ajfReportAttributes = element(by.className('dino-report-attributes'));
    const reportAttributesDisplayed = await ajfReportAttributes.isDisplayed();

    expect(reportAttributesDisplayed).toEqual(true);
  });

  it('should open a dialog for Importing a Report Schema from an xlsx file', async () => {
    const schemaActionBtns = element(by.className('dino-edit-report-schema-actions'));
    const importBtn = schemaActionBtns.all(by.tagName('button')).first();

    await browser.wait(EC.elementToBeClickable(importBtn));
    await importBtn.click();

    const importReport = element(by.tagName('dino-import-report-schema'));

    await browser.wait(EC.presenceOf(importReport));

    const importDisplayed = await importReport.isDisplayed();

    expect(importDisplayed).toEqual(true);
  });
});
