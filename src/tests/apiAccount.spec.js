const { test, expect } = require('../fixtures/test.fixture');

let name;
let accountId;

test('Create an account via API', async ({ accountPage, api }) => {
    name = `Account-API-${Date.now()}`;
    accountId = await api.create('Account', { Name: name });
    console.log(`✅ Account created: ${accountId}`);

    await accountPage.openAccountDetail(accountId);

    const accountName = await accountPage.getPrimaryField()
    expect(accountName).toEqual(name)
});

test('Delete an account via API', async ({ api }) => {
    const deleted = await api.delete('Account', accountId);
    expect(deleted).toBe(true);
    console.log(`🧹 Account deleted: ${accountId}`);
});