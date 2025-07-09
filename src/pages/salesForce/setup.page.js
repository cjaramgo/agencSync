const BasePage = require('../base.page');
const { SetupUserIframe } = require('./setupUser.iframe');

class SetupPage extends BasePage {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        super(page);

        this.quickFindInput = page.locator('input[placeholder="Quick Find"]');
    }

    async searchInSetup(option) {
        await this.quickFindInput.fill(option);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }

    async goToSetupOption(optionText) {
        await this.searchInSetup(optionText);
        const optionLocator = this.page.locator(`a:has-text("${optionText}")`);
        await optionLocator.first().click();
        await this.page.waitForLoadState('networkidle');
    }

    async waitForUserIframe() {
        await this.page.locator('iframe[title*="User"]').waitFor({ state: 'attached', timeout: 10000 });
    }

    async getUserIframe() {      
        const frameLocator = this.page.frameLocator('iframe[title*="User"]');
        return new SetupUserIframe(frameLocator);
    }

}

module.exports = { SetupPage }