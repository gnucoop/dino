import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-material-edit-form', () => {
  beforeEach(async () => await browser.get('/collect'));

  it('should display a Dewco collect component', async () => {
    const collect = await element(by.tagName('dewco-collect')).isPresent();
    expect(collect).toBe(true);
  });

  it('should display one or more Grid Tiles', async () => {
    const tilesCount = await element.all(by.tagName('mat-grid-tile')).count();
    expect(tilesCount).toBeGreaterThan(0);
  });

  it('should enter an edit form page', async () => {
    const gridTiles = await element.all(by.tagName('mat-grid-tile'));
    const tile = gridTiles[0];

    await browser.wait(EC.elementToBeClickable(tile), 1000);
    await tile.click();

    await browser.sleep(1000);
    let currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('list');

    const actionIcons =
        await element.all(by.css('.mat-cell.dewco-row-actions .mat-icon.mat-list-icon'));
    const editIcon = actionIcons[1];

    await browser.actions().mouseMove(editIcon).perform();
    await browser.wait(EC.elementToBeClickable(editIcon), 1000);
    await browser.actions().click().perform();
    await browser.sleep(1000);

    currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain('edit');
  });
});
