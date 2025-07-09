const base = require('@playwright/test').test;
const { expect } = require('@playwright/test');

const { LoginPage } = require('../pages/salesForce/login.page');
const { AccountPage } = require('../pages/salesForce/account.page');
const { ContactPage } = require('../pages/salesForce/contact.page');
const { HomePage } = require('../pages/salesForce/home.page');
const { SetupPage } = require('../pages/salesForce/setup.page')
const TestDataFactory = require('../utils/TestDataFactory');
const SalesforceAPIClient = require('../utils/SalesforceAPIClient')

/**
 * @typedef {import('../pages/salesForce/login.page').LoginPage} LoginPageType
 * @typedef {import('../pages/salesForce/contact.page').ContactPage} ContactPageType
 * @typedef {import('../pages/salesForce/account.page').AccountPage} AccountPageType
 * @typedef {import('../pages/salesForce/setup.page').SetupPage} SetupPageType
 * @typedef {typeof import('../utils/TestDataFactory')} TestDataType
 */

/** 
 * @type {import('@playwright/test').TestType<
 * { 
 * loginPage: LoginPageType,
 * contactPage: ContactPageType, 
 * accountPage: AccountPageType,
 * setupPage: SetupPageType,
 * testData: TestDataType
 * }, {}>} 
 
*/
const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },

  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },

  setupPage: async ({ page }, use) => {
  // Returns a function that the test can use
    await use(async (triggerAction) => {
      const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        triggerAction(),
      ]);

      await newPage.waitForLoadState('domcontentloaded');

      return new SetupPage(newPage);
    });
  },

  testData: async ({}, use) => {
    await use(TestDataFactory);
  },

  api: async ({}, use) => {
    const sf = new SalesforceAPIClient();

    await sf.authenticate(); // Connect to the API
    await use(sf);           
    await sf.close();        // Cleanup
  },

});

module.exports = {
  test,
  expect,
};
