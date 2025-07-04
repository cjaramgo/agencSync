const { test, expect } = require('../fixtures/test.fixture');
const TestDataFactory = require('../utils/TestDataFactory');


test('Create a contact via UI', async ({ contactPage, testData }) => {
    const contact = testData.generateContact();

    try {

        await test.step('Navigate to Contact list', async () => {
            await contactPage.navigate('/lightning/o/Contact/list');
        });

        await test.step('Create new contact', async () => {
            contactPage.createContact(contact)
        });

        await test.step('Verify contact created', async () => {

            const message = await contactPage.getToastText()
            const contactName = await contactPage.getPrimaryField()
        
            expect(message).toContain(`Contact "${contact.fullName}" was created.`)
            expect(contactName).toEqual(contact.fullName)
        });

    } finally {
        await test.step('Teardown: delete contact', async () => {
            console.log('contact removed')
            // await deleteContactByName(contactName); // tu lógica de limpieza
        });
    }

});


test.afterEach( async ({ contactPage }) => {
    await contactPage.page.close()
})