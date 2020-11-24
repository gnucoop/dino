import {
  browser,
  by,
  element,
} from 'protractor';

describe('dewco-ionic-login', () => {
  beforeEach(async () => await browser.get('/ion-login'));

  it('should not display an error message on init', async () => {
    const errorMsg = element(by.id('dewco-login-error'));
    const res = await errorMsg.isPresent();
    expect(res).toBe(false);
  });

  it('should disable the login button if the form value is invalid', async () => {
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.name('submitButton'));
    const emailInput = form.element(by.id('dewco-login-email')).element(by.tagName('input'));
    const pswInput = form.element(by.id('dewco-login-password')).element(by.tagName('input'));

    await emailInput.clear();
    await pswInput.clear();

    const res = await loginButton.getAttribute('aria-disabled');
    expect(res).toEqual('true');
  });

  it('should enable the login button if the form value is valid', async () => {
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.name('submitButton'));
    const emailInput = form.element(by.id('dewco-login-email')).element(by.tagName('input'));
    const pswInput = form.element(by.id('dewco-login-password')).element(by.tagName('input'));

    await emailInput.sendKeys('email@email.io');
    await pswInput.sendKeys('password');

    const res = await loginButton.getAttribute('aria-disabled');
    expect(res).toBeNull();
  });

  it('should show the error message if login was unsuccessful', async () => {
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.name('submitButton'));
    const emailInput = form.element(by.id('dewco-login-email')).element(by.tagName('input'));
    const pswInput = form.element(by.id('dewco-login-password')).element(by.tagName('input'));
    const errorMsg = element(by.id('dewco-login-error'));

    await emailInput.sendKeys('wrong@email.io');
    await pswInput.sendKeys('wrongpass');
    await loginButton.click();

    const res = await errorMsg.isPresent();
    expect(res).toBe(true);
  });

  it('should not show the error message if login was successful', async () => {
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.name('submitButton'));
    const emailInput = form.element(by.id('dewco-login-email')).element(by.tagName('input'));
    const pswInput = form.element(by.id('dewco-login-password')).element(by.tagName('input'));
    const errorMsg = element(by.id('dewco-login-error'));

    await emailInput.sendKeys('user@dewco.io');
    await pswInput.sendKeys('dewco');
    await loginButton.click();

    const res = await errorMsg.isPresent();
    expect(res).toBe(false);
  });

  it('should redirect to home url after a successful login', async () => {
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.name('submitButton'));
    const emailInput = form.element(by.id('dewco-login-email')).element(by.tagName('input'));
    const pswInput = form.element(by.id('dewco-login-password')).element(by.tagName('input'));

    await emailInput.sendKeys('user@dewco.io');
    await pswInput.sendKeys('dewco');
    await loginButton.click();

    const res = await browser.getCurrentUrl();
    expect(res).toEqual(browser.baseUrl + '/');
  });

  it('should not redirect to home url after a failed login', async () => {
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.name('submitButton'));
    const emailInput = form.element(by.id('dewco-login-email')).element(by.tagName('input'));
    const pswInput = form.element(by.id('dewco-login-password')).element(by.tagName('input'));

    await emailInput.sendKeys('wrong@mail.io');
    await pswInput.sendKeys('wrongpsw');
    await loginButton.click();

    const res = await browser.getCurrentUrl();
    expect(res).toEqual(browser.baseUrl + '/ion-login');
  });
});
