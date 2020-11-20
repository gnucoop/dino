import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

export class MockElement {
  name: string;
  weight: number;
  symbol: string;
  id: string;
  created_at: string;
  updated_at: string;
}

export const ELEMENT_DATA: MockElement[] = [
  {id: '', name: 'Hydrogen', weight: 1.0079, symbol: 'H', created_at: '', updated_at: ''},
  {id: '', name: 'Helium', weight: 4.0026, symbol: 'He', created_at: '', updated_at: ''},
  {id: '', name: 'Lithium', weight: 6.941, symbol: 'Li', created_at: '', updated_at: ''},
  {id: '', name: 'Beryllium', weight: 9.0122, symbol: 'Be', created_at: '', updated_at: ''},
  {id: '', name: 'Boron', weight: 10.811, symbol: 'B', created_at: '', updated_at: ''},
  {id: '', name: 'Carbon', weight: 12.0107, symbol: 'C', created_at: '', updated_at: ''},
  {id: '', name: 'Nitrogen', weight: 14.0067, symbol: 'N', created_at: '', updated_at: ''},
  {id: '', name: 'Oxygen', weight: 15.9994, symbol: 'O', created_at: '', updated_at: ''},
  {id: '', name: 'Fluorine', weight: 18.9984, symbol: 'F', created_at: '', updated_at: ''},
  {id: '', name: 'Neon', weight: 20.1797, symbol: 'Ne', created_at: '', updated_at: ''},
];

export const displayedHeaders: any[] = [
  {column: 'name', label: 'Name', sortable: true},
  {column: 'weight', label: 'Weight', sortable: true},
  {column: 'data', label: 'FormData', sortable: false},
  {column: 'symbol', label: 'Symbol', sortable: false},
];


describe('dewco-mat-list', () => {
  beforeEach(async () => {
    await browser.get('/mat-list');
    await browser.waitForAngularEnabled(false);
    await browser.sleep(1000);
  });

  it('should display a material table', async () => {
    const table = await element(by.tagName('dewco-mat-list')).isPresent();
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
    const title = await element(by.tagName('dewco-mat-list h2')).getText();
    expect(title).toEqual('Example List');
  });

  it('should display the correct header cells', async () => {
    const expectedCells = ['', 'Name', 'Weight', 'FormData', 'Symbol', ''];
    const headerCells = await element.all(by.tagName('mat-header-cell')).getText();
    expect(headerCells).toEqual(expectedCells);
  });

  it('should display all the table rows', async () => {
    const paginatorNum =
        +await element(by.css('.mat-paginator .mat-select')).getAttribute('ng-reflect-value');
    const rows = await element.all(by.tagName('mat-row')).count();
    expect(rows).toEqual(paginatorNum);
    expect(rows).toBeLessThanOrEqual(ELEMENT_DATA.length);
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

  it('should delete a row by clicking on its action-delete button', async () => {
    const paginatorNum =
        +await element(by.css('.mat-paginator .mat-select')).getAttribute('ng-reflect-value');
    const initialRowCount = await element.all(by.tagName('mat-row')).count();
    const firstActionCell =
        element
            .all(by.className(
                'mat-cell cdk-cell cdk-column-actions mat-column-actions ng-star-inserted'))
            .get(0);
    const deleteIcon = firstActionCell.element(by.cssContainingText('.mat-icon', 'delete'));
    await deleteIcon.isPresent().then(res => {
      expect(res).toBe(true);
    });
    await browser.actions().mouseMove(deleteIcon).perform();
    await deleteIcon.isDisplayed().then(res => {
      expect(res).toBe(true);
    });
    await browser.wait(EC.elementToBeClickable(deleteIcon), 1000);
    await deleteIcon.click();
    await browser.sleep(1000);
    const newFirstActionCell =
        element
            .all(by.className(
                'mat-cell cdk-cell cdk-column-actions mat-column-actions ng-star-inserted'))
            .get(0);
    await element.all(by.tagName('mat-row')).count().then(count => {
      expect(count).toBeLessThanOrEqual(initialRowCount);
      expect(count).toBeLessThanOrEqual(paginatorNum);
      expect(newFirstActionCell).not.toEqual(firstActionCell);
    });
  });

  it('should delete all the rows by clicking the bulk-actions checkbox and the bulk delete button',
     async () => {
       const initialRowCount = await element.all(by.tagName('mat-row')).count();
       expect(initialRowCount).not.toEqual(0);
       const bulkBox = element(by.tagName('mat-header-cell')).element(by.tagName('mat-checkbox'));
       const bulkDeleteButton =
           element(by.css('.mat-raised-button[aria-label="Delete all items"]'));

       expect(await bulkBox.isPresent()).toBe(true);
       expect(await bulkDeleteButton.isPresent()).toBe(true);

       await bulkBox.click();
       await browser.sleep(1000);

       expect(await bulkDeleteButton.isEnabled()).toBe(true);

       await bulkDeleteButton.click();
       await browser.sleep(1000);

       const finalRowCount = await element.all(by.tagName('mat-row')).count();
       expect(finalRowCount).toEqual(initialRowCount - 1);
     });

  it('should delete only the selected rows by clicking the bulk delete button', async () => {
    const initialRowCount = await element.all(by.tagName('mat-row')).count();
    expect(initialRowCount).not.toEqual(0);
    const bulkDeleteButton = element(by.css('.mat-raised-button[aria-label="Delete all items"]'));

    const rowBox_a = element.all(by.tagName('mat-row')).all(by.tagName('mat-checkbox')).get(1);
    const rowBox_b = element.all(by.tagName('mat-row')).all(by.tagName('mat-checkbox')).get(2);

    await rowBox_a.click();
    await rowBox_b.click();
    await browser.sleep(1000);

    expect(await rowBox_a.getAttribute('class')).toMatch('mat-checkbox-checked');
    expect(await rowBox_b.getAttribute('class')).toMatch('mat-checkbox-checked');

    expect(await bulkDeleteButton.isPresent()).toBe(true);
    expect(await bulkDeleteButton.isEnabled()).toBe(true);

    await bulkDeleteButton.click();
    await browser.sleep(1000);

    const finalRowCount = await element.all(by.tagName('mat-row')).count();
    expect(finalRowCount).not.toEqual(initialRowCount);
    expect(finalRowCount).toEqual(initialRowCount - 2);
  });
});
