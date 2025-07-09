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
        this.enableUserButton = this.page.getByRole('menuitem', { name: 'Enable Customer User' });
        this.viewCustomerUserButton = this.page.getByRole('menuitem', { name: 'View Customer User' });
        this.saveButton = this.page.getByRole('button', { name: 'Save', exact: true });
        this.createUserButton = this.page.getByRole('button', { name: 'Create User' });
    }

    async goToContacts() {
            this.contactsTab.click()
            await this.page.waitForURL(/.*Contact.*/);
        }
    
    async selectSalutation(salutation) {
        await this.salutationSelect.click()
        await this.page.locator(`lightning-base-combobox-item[data-value="${salutation}"]`).click()
    }

    async selectParentAccount(accountName){
        await this.accountSelect.click()
        await this.page.locator(`span[title="${accountName}"]`).click();
    }

    async selectUserProfile(userProfile){
        await this.profileSelect.click()
        await this.page.getByRole('option', { name: userProfile }).click()
    }

    async getContactId() {
        await this.page.waitForLoadState('load');
        await this.page.waitForSelector('.slds-notify__content', { state: 'hidden'});
        const url = this.page.url();
        const contactIdMatch = url.match(/\/Contact\/([a-zA-Z0-9]{15,18})\//);
        const contactId = contactIdMatch ? contactIdMatch[1] : null;
        if (contactId) {
            console.log('Contact ID:', contactId);
            return contactId;
        } else {
            console.error('Could not get contact ID');
        }
    }

    async navigateToContactDetail(contactId) {
        const contactUrl = `/lightning/r/Contact/${contactId}/view`;
        const currentUrl = this.page.url()
        const { pathname } = new URL(currentUrl);
        if (pathname != contactUrl) {
            await this.page.goto(contactUrl);
            await this.page.waitForURL(/.*Contact.*/);
        }
    }

    async getLightingCardInfo() {
        return await this.lightningCard.getByRole('cell').allInnerTexts()
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
        await this.waitForModalDisappear()
        // await this.page.waitForURL(/.*Contact.*/);
    }

    async enableUser(userProfile) {
        await this.showMoreButton.click();
        await this.enableUserButton.click();
        await this.waitForModal();
        await this.selectUserProfile(userProfile);
        await this.createUserButton.click();
        await this.waitForModalDisappear();
    }

    async viewCustomerUser(){
        await this.showMoreButton.click();
        await this.viewCustomerUserButton.click()
        await this.page.waitForLoadState('domcontentloaded');
    }

}
module.exports = { ContactPage };