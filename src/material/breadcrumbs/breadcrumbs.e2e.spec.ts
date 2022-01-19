import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('dino-breadcrumbs', () => {
  beforeEach(async () => await browser.get('/forms'));

  it('should display the correct elements in Breadcrumbs', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dino-collect'))));
    await browser.wait(EC.presenceOf(element(by.tagName('mat-grid-tile'))));
    const tile = element.all(by.tagName('mat-grid-tile')).first();
    await browser.wait(EC.elementToBeClickable(tile));
    await tile.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dino-list'))));

    await browser.wait(EC.presenceOf(element(by.tagName('mat-row'))));

    const matRow = element.all(by.tagName('mat-row')).get(0);

    await browser.actions().mouseMove(matRow).perform();

    await browser.wait(
      EC.presenceOf(element(by.css('.mat-cell.dino-row-actions .mat-icon.mat-list-icon'))),
    );

    const actionIcons = element.all(
      by.css(`.mat-cell.dino-row-actions
    .mat-icon.mat-list-icon`),
    );
    const editIcon = actionIcons.get(0);

    await browser.actions().mouseMove(editIcon).perform();
    await browser.wait(EC.elementToBeClickable(editIcon));

    await editIcon.click();

    await browser.wait(EC.presenceOf(element(by.tagName('dino-edit-form'))));

    const breadCrumbs = element(by.tagName('dino-breadcrumbs'));
    expect(await breadCrumbs.isDisplayed()).toEqual(true);

    const crumbFormsIcon = breadCrumbs.element(by.cssContainingText('.mat-icon', 'list_alt'));
    const crumbStarIcon = breadCrumbs.element(by.cssContainingText('.mat-icon', 'star'));
    const crumbEdit = breadCrumbs.element(
      by.cssContainingText('span.dino-breadcrumb-current-route', 'Edit'),
    );
    const crumbSeparatorIcons = breadCrumbs.all(by.cssContainingText('.mat-icon', 'navigate_next'));

    expect(await crumbFormsIcon.isDisplayed()).toEqual(true);
    expect(await crumbStarIcon.isDisplayed()).toEqual(true);
    expect(await crumbEdit.isDisplayed()).toEqual(true);
    expect(await crumbSeparatorIcons.count()).toEqual(2);
  });
});
