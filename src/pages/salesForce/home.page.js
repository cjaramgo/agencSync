const { expect } = require('@playwright/test');
const BasePage = require('../base.page');

class HomePage extends BasePage {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        super(page)
        this.profileButton = this.page.getByRole('button', { name: 'View profile' });
        this.dialogBox = this.page.getByRole('dialog');
    }
    
    /**
    * Check the current user full name
    * @param {string} fullName - Salesforce Full Name
    */
    async checkFullName(fullName) {
        await this.profileButton.click();
        await expect(this.dialogBox).toContainText(fullName);
    }
}
module.exports = { HomePage };