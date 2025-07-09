const { test, expect } = require('../fixtures/test.fixture');
const TestDataFactory = require('../utils/TestDataFactory');

test.beforeEach( async ({ accountPage }) => {
    await accountPage.navigate('/');
})

test('Create an account via UI', async ({ accountPage, testData}) => {
    const account = testData.generateAccount();
    await accountPage.navigate('/');
    accountPage.goToAccount()
    accountPage.createAccount(account)
    const message = await accountPage.getToastText()
    const accountName = await accountPage.getPrimaryField()
    
    expect(message).toContain(`Account "${account.accountName}" was created.`)
    expect(accountName).toEqual(account.accountName)
});

test('test', async ({ page }) => {
  await page.goto('https://rli-agentsync--asfull.sandbox.my.salesforce.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('cs+rli@agentsync.io.asfull');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('button', { name: 'Show More', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('menuitem', { name: 'View Customer User' }).click();
  const page1 = await page1Promise;
  await page1.goto('https://rli-agentsync--asfull.sandbox.my.salesforce-setup.com/lightning/setup/ManageUsers/page?address=%2F005DQ000000mU30YAE');
  await page1.locator('#setupComponent div').filter({ hasText: 'SetupUsers' }).first().click();
  await expect(page1.locator('.oneAlohaPage')).toBeVisible();
  await page1.locator('iframe[name="vfFrameId_1752015603987"]').contentFrame().getByRole('cell', { name: 'Federation ID' }).click();
  await expect(page1.locator('iframe[name="vfFrameId_1752015603987"]').contentFrame().locator('#ep')).toContainText('carlos.jaramillo@example.com');
  await expect(page.getByRole('rowgroup')).toContainText('carlos.jaramillo@example.com');
  await expect(page1.getByLabel('Setup Home').locator('div')).toContainText('ExpandSetup Home');
});

test.afterEach( async ({ accountPage }) => {
    await accountPage.page.close()
})