import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-list', () => {
  beforeEach(async () => await browser.get('/mat-list'));

  it('should display a material table', async () => {
    const table = await element(by.tagName('dewco-list')).isPresent();
    expect(table).toBe(true);
  });

  it('should display a checkbox column and a checkBox for bulk actions', async () => {
    const checkboxColumn = await element(by.className('mat-column-select')).isPresent();
    const checkBox = await element(by.tagName('mat-checkbox')).isPresent();
    expect(checkboxColumn).toBe(true);
    expect(checkBox).toBe(true);
  });

  it('should display a header row', async () => {
    const headerRow = await element(by.tagName('mat-header-row')).isPresent();
    expect(headerRow).toBe(true);
  });

  it('should display a table Title', async () => {
    const title = await element(by.tagName('dewco-list h2')).getText();
    expect(title).toEqual('Example List');
  });

  it('should display the correct header cells', async () => {
    const expectedCells = ['', 'Name', 'Weight', 'Symbol', ''];
    const headerCells = await element.all(by.tagName('mat-header-cell')).getText();
    expect(headerCells).toEqual(expectedCells);
  });

  it('should display all the table rows', async () => {
    const rows = await element.all(by.tagName('mat-row')).count();
    expect(rows).toEqual(5);
  });

  it('should select a row by checking the associated checkBox', async () => {
    const box = element.all(by.tagName('mat-row')).all(by.tagName('mat-checkbox')).get(0);
    await box.click();
    expect(await box.getAttribute('class')).toMatch('mat-checkbox-checked');
  });

  it('should select all rows (bulk actions checkBox)', async () => {
    const rowBoxes = element.all(by.tagName('mat-row')).all(by.tagName('mat-checkbox'));
    const bulkBox = element(by.tagName('mat-header-cell')).element(by.tagName('mat-checkbox'));
    await bulkBox.click();
    const countChecked = await element.all(by.className('mat-checkbox-checked')).count();
    expect(countChecked).toEqual(await rowBoxes.count() + 1);
  });

  it('should display the row action icons on mouseover', async () => {
    const firstRow = element.all(by.tagName('mat-row')).first();
    expect(await firstRow.isPresent()).toBe(true);
    const actions = firstRow.element(by.className('mat-column-actions'));
    const firstIcon = actions.all(by.tagName('mat-icon')).first();

    expect(await firstIcon.isDisplayed()).toBe(false);

    await browser.actions().mouseMove(firstRow.getWebElement()).perform();

    expect(await actions.isPresent()).toBe(true);
    expect(await firstIcon.isPresent()).toBe(true);
    expect(await firstIcon.isDisplayed()).toBe(true);
  });

  it(`should delete a row by clicking on its action-delete button,
      and confirming the action on the Confirmation Dialog`,
     async () => {
       const paginatorNum = +await element(by.css('.mat-select-min-line')).getText();
       const initialRowCount = await element.all(by.tagName('mat-row')).count();
       const firstActionCell =
           element
               .all(by.className(
                   'mat-cell cdk-cell cdk-column-actions mat-column-actions ng-star-inserted'))
               .get(0);
       const deleteIcon = firstActionCell.element(by.cssContainingText('.mat-icon', 'delete'));
       let res = await deleteIcon.isPresent();
       expect(res).toBe(true);
       await browser.actions().mouseMove(deleteIcon).perform();
       res = await deleteIcon.isDisplayed();
       expect(res).toBe(true);
       await browser.wait(EC.elementToBeClickable(deleteIcon), 1000);
       await deleteIcon.click();
       await browser.sleep(200);

       const confirmDialog = element(by.css('.confirmation-dialog'));
       expect(await confirmDialog.isPresent()).toBe(true);
       const confirmButton = confirmDialog.element(by.css('.dewco-confirm-button'));
       await browser.actions().mouseMove(confirmButton).perform();
       await browser.wait(EC.elementToBeClickable(confirmButton), 1000);
       await confirmButton.click();

       const newFirstActionCell =
           element
               .all(by.className(
                   'mat-cell cdk-cell cdk-column-actions mat-column-actions ng-star-inserted'))
               .get(0);
       const count = await element.all(by.tagName('mat-row')).count();
       expect(count).toBeLessThan(initialRowCount);
       expect(count).toBeLessThanOrEqual(paginatorNum);
       expect(newFirstActionCell).not.toEqual(firstActionCell);
     });

  it(`should delete all the rows by clicking the bulk-actions checkbox and the bulk delete button,
      then confirming in Confirmation Dialog`,
     async () => {
       const initialRowCount = await element.all(by.tagName('mat-row')).count();
       expect(initialRowCount).not.toEqual(0);
       const bulkBox = element(by.tagName('mat-header-cell')).element(by.tagName('mat-checkbox'));
       const bulkDeleteButton =
           element(by.css('.mat-raised-button[aria-label="Delete all items"]'));

       expect(await bulkBox.isPresent()).toBe(true);
       expect(await bulkDeleteButton.isPresent()).toBe(true);

       await bulkBox.click();
       await browser.sleep(300);

       expect(await bulkDeleteButton.isEnabled()).toBe(true);

       await bulkDeleteButton.click();
       await browser.sleep(300);

       const confirmDialog = element(by.css('.confirmation-dialog'));
       expect(await confirmDialog.isPresent()).toBe(true);
       const confirmButton = confirmDialog.element(by.css('.dewco-confirm-button'));
       await browser.actions().mouseMove(confirmButton).perform();
       await browser.wait(EC.elementToBeClickable(confirmButton), 1000);
       await confirmButton.click();

       const finalRowCount = await element.all(by.tagName('mat-row')).count();
       expect(finalRowCount).toEqual(0);
     });

  it('should delete only the selected rows by clicking the bulk delete button', async () => {
    const initialRowCount = await element.all(by.tagName('mat-row')).count();
    expect(initialRowCount).not.toEqual(0);
    const bulkDeleteButton = element(by.css('.mat-raised-button[aria-label="Delete all items"]'));

    const rowBox_a = element.all(by.tagName('mat-row')).all(by.tagName('mat-checkbox')).get(1);
    const rowBox_b = element.all(by.tagName('mat-row')).all(by.tagName('mat-checkbox')).get(2);

    await rowBox_a.click();
    await rowBox_b.click();
    await browser.sleep(300);

    expect(await rowBox_a.getAttribute('class')).toMatch('mat-checkbox-checked');
    expect(await rowBox_b.getAttribute('class')).toMatch('mat-checkbox-checked');

    expect(await bulkDeleteButton.isPresent()).toBe(true);
    expect(await bulkDeleteButton.isEnabled()).toBe(true);

    await bulkDeleteButton.click();
    await browser.sleep(300);

    const confirmDialog = element(by.css('.confirmation-dialog'));
    expect(await confirmDialog.isPresent()).toBe(true);
    const confirmButton = confirmDialog.element(by.css('.dewco-confirm-button'));
    await browser.actions().mouseMove(confirmButton).perform();
    await browser.wait(EC.elementToBeClickable(confirmButton), 1000);
    await confirmButton.click();

    const finalRowCount = await element.all(by.tagName('mat-row')).count();
    expect(finalRowCount).not.toEqual(initialRowCount);
    expect(finalRowCount).toEqual(initialRowCount - 2);
  });
});
