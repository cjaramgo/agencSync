/**
 * @typedef {import('@playwright/test').Page} Page
 * @typedef {import('@playwright/test').FrameLocator} FrameLocator
 */

class SetupUserIframe {
    /**
    * @param {FrameLocator} frameLocator - FrameLocator del iframe
    */
    constructor(frameLocator) {
        /** @type {FrameLocator} */
        this.frameLocator = frameLocator;
        
        /** @type {import('@playwright/test').Locator} */
        this.isActive = this.frameLocator.locator('#IsActive_chkbox');
    }

    async getColumnValue(columnName) {
        console.log(`[SetupUserIframe] Buscando columna con nombre: ${columnName}`);
        const element = `//tr/td[normalize-space(.)='${columnName}']/following-sibling::td[1]`
        return (await this.frameLocator.locator(element).textContent())?.trim();
    }

    async isActiveUser() {
        const title = await this.isActive.getAttribute('title');
        return title === 'Checked';
    }


}
module.exports = { SetupUserIframe };