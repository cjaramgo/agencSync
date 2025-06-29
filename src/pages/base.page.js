const fs = require('fs');
const path = require('path');

class BasePage {

  /**
   * @param {import('@playwright/test').Page} page - Playwright page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a URL and wait for DOM to load
   * @param {string} url - Target URL
   */
  async navigate(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Wait for an element to be visible and return its locator
   * @param {string} selector - CSS or XPath selector
   * @param {Object} [options]
   * @param {number} [options.timeout=10000]
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async waitForElement(selector, options = {}) {
    const timeout = options.timeout || 10000;
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    return element;
  }

  /**
   * Get toast message content
   * @returns {Promise<string>} Toast message text
   */
  async getToastText() {
    const toast = this.page.locator('.slds-notify__content');
    await toast.isVisible()
    return await toast.textContent();
  }

  /**
   * Get toast message content
   * @returns {Promise<string>} Toast message text
   */
  async getPrimaryField() {
    const primaryField = this.page.locator('[slot="primaryField"]')
    return await primaryField.textContent()
  }

  /**
   * Click a visible element
   * @param {string} selector
   */
  async click(selector) {
    const element = await this.waitForElement(selector);
    await element.click();
  }

  /**
   * Fill a visible input field
   * @param {string} selector
   * @param {string} value
   */
  async fill(selector, value) {
    const element = await this.waitForElement(selector);
    await element.fill(value);
  }

  /**
   * Get text content from a visible element
   * @param {string} selector
   * @returns {Promise<string>}
   */
  async getText(selector) {
    const element = await this.waitForElement(selector);
    return element.textContent();
  }

  /**
   * Check if an element is visible within a timeout
   * @param {string} selector
   * @returns {Promise<boolean>}
   */
  async isVisible(selector) {
    try {
      await this.waitForElement(selector, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Take a screenshot with timestamped filename
   * @param {string} name - Base name for the screenshot file
   */
  async takeScreenshot(name = 'screenshot') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const dir = path.resolve(__dirname, 'screenshots');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, `${name}-${timestamp}.png`);
    await this.page.screenshot({ path: filePath, fullPage: true });
  }

  /**
   * Wait for the current URL to match a pattern
   * @param {string|RegExp} expectedUrl
   * @param {number} [timeout=10000]
   */
  async waitForUrl(expectedUrl, timeout = 10000) {
    await this.page.waitForURL(expectedUrl, { timeout });
  }

  /**
   * Wait for a selector to appear in the DOM (not necessarily visible)
   * @param {string} selector
   * @param {number} timeout
   */
  async waitForSelector(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }
}

module.exports = BasePage;