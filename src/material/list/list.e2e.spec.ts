import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-list', () => {
  beforeEach(async () => {
    await browser.get('/collect');
  });

  it('should display a Dewco collect component', async () => {
    const collect = await element(by.tagName('dewco-collect')).isPresent();
    expect(collect).toBe(true);
  });

  it('should display one or more Grid Tiles', async () => {
    const tilesCount = await element.all(by.tagName('mat-grid-tile')).count();
    expect(tilesCount).toBeGreaterThan(0);
  });

  it('should display a material table', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();
    await browser.sleep(1000);

    const table = await element(by.tagName('dewco-list')).isPresent();
    expect(table).toBe(true);
  });

  it('should display a checkbox column and a checkBox for bulk actions', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();
    await browser.sleep(1000);

    const checkboxColumn = await element(by.className('mat-column-select')).isPresent();
    const checkBox = await element(by.tagName('mat-checkbox')).isPresent();
    expect(checkboxColumn).toBe(true);
    expect(checkBox).toBe(true);
  });

  it('should display a header row', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();
    await browser.sleep(1000);

    const headerRow = await element(by.tagName('mat-header-row')).isPresent();
    expect(headerRow).toBe(true);
  });

  it('should display the correct header cells', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();
    await browser.sleep(1000);

    const expectedCells = ['User', 'Creation Date'];
    const headerCells = await element.all(by.tagName('mat-header-cell')).getText();
    expect(headerCells.slice(1, -1)).toEqual(expectedCells);
  });

  it('should select a row by checking the associated checkBox', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();
    await browser.sleep(1000);

    const box = element.all(by.tagName('mat-row')).all(by.tagName('mat-checkbox')).get(0);
    await box.click();
    expect(await box.getAttribute('class')).toMatch('mat-checkbox-checked');
  });

  it('should select all rows (bulk actions checkBox)', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();
    await browser.sleep(1000);

    const rowBoxes = element.all(by.tagName('mat-row')).all(by.tagName('mat-checkbox'));
    const bulkBox = element(by.tagName('mat-header-cell')).element(by.tagName('mat-checkbox'));
    await bulkBox.click();
    const countChecked = await element.all(by.className('mat-checkbox-checked')).count();
    expect(countChecked).toEqual(await rowBoxes.count() + 1);
  });

  it('should display the row action icons on mouseover', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();
    await browser.sleep(1000);

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
       const gridTiles = await element.all(by.tagName('mat-grid-tile'));
       const tile = gridTiles[0];

       await browser.wait(EC.elementToBeClickable(tile), 1000);
       await tile.click();
       await browser.sleep(1000);

       const paginatorNum = +await element(by.css('.mat-select-min-line')).getText();
       const initialRowCount = await element.all(by.tagName('mat-row')).count();
       const deleteActionCell =
           element
               .all(by.className(
                   'mat-cell cdk-cell cdk-column-actions mat-column-actions ng-star-inserted'))
               .get(1);
       const deleteIcon = deleteActionCell.element(by.cssContainingText('.mat-icon', 'delete'));
       let res = await deleteIcon.isPresent();
       expect(res).toBe(true);
       await browser.actions().mouseMove(deleteIcon).perform();
       res = await deleteIcon.isDisplayed();
       expect(res).toBe(true);
       await browser.wait(EC.elementToBeClickable(deleteIcon), 1000);
       await deleteIcon.click();
       await browser.sleep(1000);

       const confirmDialog = element(by.css('.confirmation-dialog'));
       expect(await confirmDialog.isPresent()).toBe(true);
       const confirmButton = confirmDialog.element(by.css('.dewco-confirm-button'));
       await browser.actions().mouseMove(confirmButton).perform();
       await browser.wait(EC.elementToBeClickable(confirmButton), 1000);
       await confirmButton.click();
       await browser.sleep(1000);

       const newFirstActionCell =
           element
               .all(by.className(
                   'mat-cell cdk-cell cdk-column-actions mat-column-actions ng-star-inserted'))
               .get(1);
       const count = await element.all(by.tagName('mat-row')).count();
       expect(count).toBeLessThan(initialRowCount);
       expect(count).toBeLessThanOrEqual(paginatorNum);
       expect(newFirstActionCell).not.toEqual(deleteActionCell);
     });
});
