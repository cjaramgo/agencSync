const { chromium } = require('@playwright/test');
const { LoginPage } = require('../pages/salesForce/login.page');

module.exports = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.goto(process.env.SF_LOGIN_URL || 'https://login.salesforce.com');
  await loginPage.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);

  // save session in storageState
  console.log('📁 storageState.json has been created.');
  await page.context().storageState({ path: './storageState.json' });
  await browser.close();
};
