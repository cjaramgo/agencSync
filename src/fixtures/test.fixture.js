const base = require('@playwright/test').test;
const { expect } = require('@playwright/test');

const { LoginPage } = require('../pages/salesForce/login.page');
const { AccountPage } = require('../pages/salesForce/account.page');
const { ContactPage } = require('../pages/salesForce/contact.page');
const { HomePage } = require('../pages/salesForce/home.page');
const TestDataFactory = require('../utils/TestDataFactory');


const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  HomePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },

  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },

  testData: async ({}, use) => {
    const data = {
      account: TestDataFactory.generateAccount(),
      contact: TestDataFactory.generateContact()
    };
    await use(data);
  }
});

module.exports = {
  test,
  expect,
};
