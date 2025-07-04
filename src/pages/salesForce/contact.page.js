const BasePage = require('../base.page');


class ContactPage extends BasePage {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        super(page);

        this.contactsTab = this.page.getByRole('link', { name: 'Contacts' });
        this.newButton = this.page.getByRole('button', { name: 'New', exact: true });
        this.salutationSelect = this.page.getByRole('combobox', { name: 'Salutation' });
        this.firstNameInput = this.page.locator('[name="firstName"]');
        this.lastNameInput = this.page.locator('[name="lastName"]');
        this.phoneInput = this.page.locator('[name="Phone"]');
        this.emailInput = this.page.locator('[name="Email"]');
        this.accountSelect = this.page.getByRole('combobox', { name: 'Account Name' });
        this.lightningCard = this.page.locator('lightning-card');
        this.showMoreButton = this.page.getByRole('button', { name: 'Show More', exact: true });
        this.profileSelect = this.page.locator('button[name="ProfileId"]');
        this.saveButton = this.page.getByRole('button', { name: 'Save', exact: true });
    }

    async goToContacts() {
            this.contactsTab.click()
            await this.page.waitForURL(/.*Contact.*/);
        }
    
    async selectSalutation(salutation) {
        this.salutationSelect.click()
        await this.page.locator(`lightning-base-combobox-item[data-value="${salutation}"]`).click()
    }

    async selectParentAccount(accountName){
        this.accountSelect.click()
        await this.page.locator(`span[title="${accountName}"]`).click();
    }

    async selectUserProfile(userProfile){
        this.accountSelect.click()
        await this.page.locator('option', { name: userProfile }).click()
    }

    async createContact(contact) {
        await this.newButton.click();
        await this.waitForModal();
        // await this.selectSalutation(contact.salutation);
        await this.firstNameInput.fill(contact.firstName);
        await this.lastNameInput.fill(contact.lastName);
        await this.selectParentAccount('QA POC Test')
        await this.phoneInput.fill(contact.phoneNumber);
        await this.emailInput.fill(contact.email);
        await this.saveButton.click();
        await this.page.waitForURL(/.*Contact.*/);
    }

    async createUser(contactId, userProfile) {
        await this.showMoreButton.click()
        await this.waitForModal();
        await this.profileSelect.click()
        await this.selectUserProfile(userProfile)

    }

}
module.exports = { ContactPage };