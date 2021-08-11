import {
  browser,
  by,
  element,
  ExpectedConditions as EC,
} from 'protractor';

describe('dewco-login', () => {
  beforeEach(async () => await browser.get('/login'));

  it('should not display an error message on init', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-login'))));
    const errorMsg = element(by.css('.dewco-error-message'));
    const res = await errorMsg.isPresent();
    expect(res).toBe(false);
  });

  it('should disable the login button if the form value is invalid', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-login'))));
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.className('mat-fab mat-button-base'));
    const emailInput = form.element(by.name('email'));
    const pswInput = form.element(by.name('password'));

    await emailInput.clear();
    await pswInput.clear();

    const res = await loginButton.isEnabled();
    expect(res).toBe(false);
  });

  it('should enable the login button if the form value is valid', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-login'))));
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.className('mat-fab mat-button-base'));
    const emailInput = form.element(by.name('email'));
    const pswInput = form.element(by.name('password'));

    await emailInput.sendKeys('email@email.io');
    await pswInput.sendKeys('password');

    const res = await loginButton.isEnabled();
    expect(res).toBe(true);
  });

  it('should show the error message if login was unsuccessful', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-login'))));
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.className('mat-fab mat-button-base'));
    const emailInput = form.element(by.name('email'));
    const pswInput = form.element(by.name('password'));
    const errorMsg = form.element(by.className('dewco-error-message'));

    await emailInput.sendKeys('wrong@email.io');
    await pswInput.sendKeys('wrongpass');
    await loginButton.click();

    const res = await errorMsg.isPresent();
    expect(res).toBe(true);
  });

  it('should not show the error message if login was successful', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-login'))));
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.className('mat-fab mat-button-base'));
    const emailInput = form.element(by.name('email'));
    const pswInput = form.element(by.name('password'));
    const errorMsg = form.element(by.className('dewco-error-message'));

    expect(await loginButton.isPresent()).toBe(true);
    expect(await emailInput.isPresent()).toBe(true);
    expect(await pswInput.isPresent()).toBe(true);

    await emailInput.clear();
    await emailInput.sendKeys('dino');
    await pswInput.clear();
    await pswInput.sendKeys('dino');

    await browser.sleep(1000);
    await browser.wait(EC.elementToBeClickable(loginButton), 5000);
    await loginButton.click();
    await browser.sleep(1000);

    expect(await errorMsg.isPresent()).toBe(false);
  });

  it('should redirect to the post-login url after a successful login', async () => {
    await browser.wait(EC.presenceOf(element(by.tagName('dewco-login'))));
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.className('mat-fab mat-button-base'));
    const emailInput = form.element(by.name('email'));
    const pswInput = form.element(by.name('password'));

    await emailInput.clear();
    await emailInput.sendKeys('dino');
    await pswInput.clear();
    await pswInput.sendKeys('dino');

    await browser.sleep(1000);
    await browser.wait(EC.elementToBeClickable(loginButton), 5000);
    await loginButton.click();
    await browser.sleep(1000);

    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl + '/dashboard');
  });
});
