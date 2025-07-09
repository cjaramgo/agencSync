const { test, expect } = require('../fixtures/test.fixture');

let contactId
let message
let contactName
let cardInfo
const userProfile = 'AgentSync Internal Portal'

test.beforeEach( async ({ contactPage }) => {

    await test.step('Navigate to Contacts', async () => {
        await contactPage.navigate('/lightning/o/Contact/list');
    });
})

test('Should enable Contact as a Portal User', async ({ contactPage, testData, setupPage }) => {
    const contact = testData.generateContact();

    await test.step('Create new contact', async () => {
        await contactPage.createContact(contact);

        message = await contactPage.getToastText();
        contactName = await contactPage.getPrimaryField();

        expect(message).toContain(`Contact "${contact.fullName}" was created.`);
        expect(contactName).toEqual(contact.fullName);
            
        contactId = await contactPage.getContactId();
    });

    await test.step('Enable contact as Portal user', async () => {
        await contactPage.navigateToContactDetail(contactId);
        await contactPage.enableUser(userProfile)
    });

    await test.step('Verify user is enabled', async () => {
        message = await contactPage.getToastText();
        cardInfo = await contactPage.getLightingCardInfo();

        expect(message).toContain(`A user was created with username: ${contact.email}`);
        expect(cardInfo[0]).toContain(userProfile);
        expect(cardInfo[2]).toEqual(contact.email);
    });

    await test.step('Verify Federation ID is displayed', async () => {
        const setup = await setupPage(async () => {
            await contactPage.viewCustomerUser();
        });

        setup.waitForUserIframe()
        const userIframe = await setup.getUserIframe();
                
        const FederationId = await userIframe.getColumnValue('Federation ID')
        const activeUser = await userIframe.isActiveUser()

        expect(FederationId).toContain(contact.email)
        expect(activeUser).toBe(true);
    });

});

//crear otro test llamado verify FederationID

// test.afterEach( async ({ contactPage }) => {
//     await contactPage.page.close()
// })