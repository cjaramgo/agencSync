import { test, expect } from '../fixtures/test.fixture';
const TestDataFactory = require('../utils/TestDataFactory');

test.beforeEach( async ({ accountPage }) => {
    await accountPage.navigate('/');
})

test('Should create a Salesforce account', async ({ accountPage, testData }) => {
    const {account} = testData;
    accountPage.goToAccount()
    accountPage.createAccount(account)
    const message = await accountPage.getToastText()
    const accountName = await accountPage.getPrimaryField()
    
    expect(message).toContain(`Account "${account.accountName}" was created.`)
    expect(accountName).toEqual(account.accountName)
});


test.afterEach( async ({page}) => {
    await page.close()
})