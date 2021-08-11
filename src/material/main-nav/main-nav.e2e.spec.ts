import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-main-nav', () => {
  beforeEach(async () => await browser.get('/dashboard'));

  it('should display a Main Nav component', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-main-nav'))));
    const nav = await element(by.tagName('dewco-main-nav')).isPresent();
    expect(nav).toBe(true);
  });

  it('should expand the Menu showing section labels', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-main-nav'))));
    const menuButton = element(by.css('button[aria-label="Toggle menu button"]'));
    const sideNav = element(by.css('.mat-sidenav.dewco-sidenav'));

    expect(await menuButton.isPresent()).toBe(true);
    expect(await sideNav.isPresent()).toBe(true);
    expect(await sideNav.getAttribute('class')).not.toContain('extended');

    await browser.actions().mouseMove(menuButton).perform();
    await browser.wait(EC.elementToBeClickable(menuButton));
    await menuButton.click();
    await browser.sleep(2000);

    expect(await sideNav.getAttribute('class')).toContain('extended');
  });

  it('should logout the user and redirect to the login page', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-main-nav'))));
    const logoutButton = element(by.css('.dewco-logout-button'));

    expect(await logoutButton.isPresent()).toBe(true);

    await browser.actions().mouseMove(logoutButton).perform();
    await browser.wait(EC.elementToBeClickable(logoutButton));
    await logoutButton.click();
    await browser.sleep(2000);

    expect(await browser.getCurrentUrl()).toContain('login');
  });
});
