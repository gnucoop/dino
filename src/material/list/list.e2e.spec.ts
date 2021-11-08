import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('dino-list', () => {
  beforeEach(async () => {
    await browser.get('/forms');
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();

    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();
  });

  it('should display a material table', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dino-list'))));
  });

  it('should display a checkbox column and a checkBox for bulk actions', async () => {
    await browser.wait(EC.presenceOf(element(by.className('mat-column-select'))));
    await browser.wait(EC.presenceOf(element(by.className('mat-checkbox'))));
  });

  it('should display the correct header cells', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-header-cell'))));
    const expectedCells = ['Area', 'Location', 'Organization', 'Project', 'Creation Date'];
    const headerCells = await element.all(by.tagName('mat-header-cell')).getText();
    expect(headerCells.slice(1, -1)).toEqual(expectedCells);
  });

  it('should select a row by checking the associated checkBox', async () => {
    await browser.wait(EC.presenceOf(element(by.css('.mat-row .mat-checkbox'))));
    const box = element(by.css('.mat-row .mat-checkbox'));
    await box.click();
    expect(await box.getAttribute('class')).toMatch('mat-checkbox-checked');
  });

  it('should select all rows (bulk actions checkBox)', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-checkbox'))));
    const rowBoxes = element.all(by.tagName('mat-row')).all(by.tagName('mat-checkbox'));
    const bulkBox = element(by.tagName('mat-header-cell')).element(by.tagName('mat-checkbox'));
    await bulkBox.click();

    await browser.sleep(300);

    const countChecked = await element.all(by.className('mat-checkbox-checked')).count();
    expect(countChecked).toEqual((await rowBoxes.count()) + 1);
  });

  it('should display the row action icons on mouseover', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('mat-row'))));
    const firstRow = element(by.tagName('mat-row'));
    const actions = firstRow.element(by.className('mat-column-actions'));
    const firstIcon = actions.element(by.tagName('mat-icon'));

    expect(await firstIcon.isDisplayed()).toBe(false);

    await browser.actions().mouseMove(firstRow.getWebElement()).perform();

    expect(await actions.isPresent()).toBe(true);
    expect(await firstIcon.isPresent()).toBe(true);
    expect(await firstIcon.isDisplayed()).toBe(true);
  });

  it(`should delete a row by clicking on its action-delete button,
      and confirming the action on the Confirmation Dialog`, async () => {
    await browser.wait(EC.presenceOf(element(by.css('.mat-select-min-line'))));
    await browser.wait(EC.presenceOf(element(by.tagName('mat-row'))));

    const initialRowCount = await element.all(by.tagName('mat-row')).count();

    const matRow = element.all(by.tagName('mat-row')).get(0);

    await browser.actions().mouseMove(matRow).perform();

    await browser.wait(
      EC.presenceOf(element(by.css('.mat-cell.dino-row-actions .mat-icon.mat-list-icon'))),
    );

    const actionIcons = element.all(by.css('.mat-cell.dino-row-actions .mat-icon.mat-list-icon'));
    const deleteIcon = actionIcons.get(2);

    await browser.actions().mouseMove(deleteIcon).perform();
    await browser.wait(EC.elementToBeClickable(deleteIcon));
    await browser.actions().click().perform();

    await browser.wait(EC.presenceOf(element(by.css('.confirmation-dialog'))));

    const confirmDialog = element(by.css('.confirmation-dialog'));
    expect(await confirmDialog.isPresent()).toBe(true);
    const confirmButton = confirmDialog.element(by.css('.dino-confirm-button'));
    await browser.actions().mouseMove(confirmButton).perform();
    await browser.wait(EC.elementToBeClickable(confirmButton));
    await confirmButton.click();

    await browser.sleep(300);

    const count = await element.all(by.tagName('mat-row')).count();
    expect(count).toBeLessThan(initialRowCount);
  });
});
