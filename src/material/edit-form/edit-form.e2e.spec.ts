import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-material-edit-form', () => {
  beforeAll(async () => await browser.get('/collect'));

  it('should enter in a Form Edit view ', async () => {
    const gridTile = element.all(by.tagName('mat-grid-tile')).first();

    await browser.wait(EC.elementToBeClickable(gridTile), 1000);
    await gridTile.click();
    await browser.sleep(1000);

    const actionIcons =
        await element.all(by.css('.mat-cell.dewco-row-actions .mat-icon.mat-list-icon'));
    const editIcon = actionIcons[1];

    await browser.actions().mouseMove(editIcon).perform();
    await browser.wait(EC.elementToBeClickable(editIcon), 1000);
    await browser.actions().click().perform();
    await browser.sleep(1000);

    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('edit');
  });

  it('should display a Dewco edit form component', async () => {
    const edit = await element(by.tagName('dewco-edit-form')).isPresent();
    expect(edit).toBe(true);
  });
});
