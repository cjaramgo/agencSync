const BasePage = require('../base.page');


class ContactPage extends BasePage {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        super(page);

        this.contactsTab = this.page.getByRole('link', { name: 'Contacts' });
        this.newButton = this.page.getByRole('button', { name: 'New' });
        this.salutationSelect = this.page.getByRole('combobox', { name: 'Salutation' });
        this.firstNameInput = this.page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = this.page.getByRole('textbox', { name: '*Last Name' });
        this.phoneInput = this.page.getByRole('textbox', { name: 'Phone', exact: true });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
        this.saveButton = this.page.getByRole('button', { name: 'Save', exact: true });
    }

    async goToContacts() {
            this.contactsTab.click()
        }
    
    async selectSalutation(salutation) {
        const salutationOption = this.page.locator(`lightning-base-combobox-item[data-value="${salutation}"]`)
        salutationOption.click()
    }

    async createContact(contact) {
        await this.newButton.click();
        // await this.selectSalutation(contact.salutation);
        await this.firstNameInput.fill(contact.firstName);
        await this.lastNameInput.fill(contact.lastName);
        await this.phoneInput.fill(contact.phoneNumber);
        await this.emailInput.fill(contact.email);
        await this.saveButton.click();
        await this.page.waitForURL(/.*Contact.*/);
    }
}
module.exports = { ContactPage };