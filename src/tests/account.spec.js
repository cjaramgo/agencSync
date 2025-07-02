const { test, expect } = require('../fixtures/test.fixture');
const TestDataFactory = require('../utils/TestDataFactory');

test.beforeEach( async ({ accountPage }) => {
    await accountPage.navigate('/');
})

test('Create an account via UI', async ({ accountPage, testData }) => {
    const {account} = testData;
    await accountPage.navigate('/');
    accountPage.goToAccount()
    accountPage.createAccount(account)
    const message = await accountPage.getToastText()
    const accountName = await accountPage.getPrimaryField()
    
    expect(message).toContain(`Account "${account.accountName}" was created.`)
    expect(accountName).toEqual(account.accountName)
});


test.afterEach( async ({ accountPage }) => {
    await accountPage.page.close()
})