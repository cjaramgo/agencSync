const { test, expect } = require('../fixtures/test.fixture');
const TestDataFactory = require('../utils/TestDataFactory');

test.beforeEach( async ({ contactPage }) => {
    await contactPage.navigate('/');
})

test('Should create a Salesforce contact', async ({ contactPage, testData }) => {
    const {contact} = testData;
    contactPage.goToContacts()
    contactPage.createContact(contact)
    const message = await contactPage.getToastText()
    const contactName = await contactPage.getPrimaryField()
    
    expect(message).toContain(`Contact "${contact.fullName}" was created.`)
    expect(contactName).toEqual(contact.fullName)
});


test.afterEach( async ({page}) => {
    await page.close()
})