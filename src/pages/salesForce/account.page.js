// import { expect } from '@playwright/test';
const BasePage = require('../base.page');

class AccountPage extends BasePage {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        super(page);

        this.accountsTab = this.page.getByRole('link', { name: 'Accounts' });
        this.newAccountButton = this.page.getByRole('button', { name: 'New' });
        this.accountNameInput = this.page.getByRole('textbox', { name: '*Account Name' });
        this.accountNumberInput = this.page.getByRole('textbox', { name: 'Account Number' });
        this.accountPhoneInput = this.page.getByRole('textbox', { name: 'Phone' });
        this.accountWebsiteInput = this.page.getByRole('textbox', { name: 'Website' });
        this.saveButton = this.page.getByRole('button', { name: 'Save', exact: true });
    }

    async goToAccount() {
        this.accountsTab.click()
        await this.page.waitForURL(/.*Account.*/);
    }

    async openAccountDetail(accountId) {
        await this.page.goto(`/lightning/r/Account/${accountId}/view`);
        await this.page.waitForURL(/.*Account.*/);
    }

    async createAccount(account) {
        await this.newAccountButton.click()
        await this.accountNameInput.fill(account.accountName)
        await this.accountPhoneInput.fill(account.phoneNumber)
        await this.accountWebsiteInput.fill(account.website)
        await this.saveButton.click();
        await this.page.waitForURL(/.*Account.*/);
    }
}
module.exports = { AccountPage }