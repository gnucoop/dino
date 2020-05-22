import {
  browser,
  by,
  element,
} from 'protractor';

describe('dewco-material-login', () => {
  beforeEach(async () => await browser.get('/mat-login'));

  it('should not display an error message on init', async () => {
    const errorMsg = element(by.className('error-message'));
    await errorMsg.isPresent().then(res => {
      expect(res).toBe(false);
    });
  });

  it('should disable the login button if the form value is invalid', async () => {
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.className('mat-fab mat-button-base'));
    const emailInput = form.element(by.name('email'));
    const pswInput = form.element(by.name('password'));

    await emailInput.clear();
    await pswInput.clear();

    await loginButton.isEnabled().then(res => {
      expect(res).toBe(false);
    });
  });

  it('should enable the login button if the form value is valid', async () => {
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.className('mat-fab mat-button-base'));
    const emailInput = form.element(by.name('email'));
    const pswInput = form.element(by.name('password'));

    await emailInput.sendKeys('email@email.io');
    await pswInput.sendKeys('password');

    await loginButton.isEnabled().then(res => {
      expect(res).toBe(true);
    });
  });

  it('should show the error message if login was unsuccessful', async () => {
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.className('mat-fab mat-button-base'));
    const emailInput = form.element(by.name('email'));
    const pswInput = form.element(by.name('password'));
    const errorMsg = form.element(by.className('error-message'));

    await emailInput.sendKeys('wrong@email.io');
    await pswInput.sendKeys('wrongpass');
    await loginButton.click();

    await errorMsg.isPresent().then(res => {
      expect(res).toBe(true);
    });
  });

  it('should not show the error message if login was successful', async () => {
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.className('mat-fab mat-button-base'));
    const emailInput = form.element(by.name('email'));
    const pswInput = form.element(by.name('password'));
    const errorMsg = form.element(by.className('error-message'));

    await emailInput.sendKeys('user@dewco.io');
    await pswInput.sendKeys('dewco');
    await loginButton.click();

    await errorMsg.isPresent().then(res => {
      expect(res).toBe(false);
    });
  });

  it('should redirect to home url after a successful login', async () => {
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.className('mat-fab mat-button-base'));
    const emailInput = form.element(by.name('email'));
    const pswInput = form.element(by.name('password'));

    await emailInput.sendKeys('user@dewco.io');
    await pswInput.sendKeys('dewco');
    await loginButton.click();

    await browser.getCurrentUrl().then(res => {
      expect(res).toEqual(browser.baseUrl + '/');
    });
  });

  it('should not redirect to home url after a failed login', async () => {
    const form = element(by.tagName('form'));
    const loginButton = form.element(by.className('mat-fab mat-button-base'));
    const emailInput = form.element(by.name('email'));
    const pswInput = form.element(by.name('password'));

    await emailInput.sendKeys('wrong@mail.io');
    await pswInput.sendKeys('wrongpsw');
    await loginButton.click();

    await browser.getCurrentUrl().then(res => {
      expect(res).toEqual(browser.baseUrl + '/mat-login');
    });
  });
});
