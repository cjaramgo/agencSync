const fs = require('fs');
const path = require('path');

class BasePage {

  /**
   * @param {import('@playwright/test').Page} page - Playwright page
   */
  constructor(page) {
    this.page = page;
    this.modal = this.page.locator('.slds-modal[role="dialog"]');
    this.toast = this.page.locator('.slds-notify__content');
  }

  /**
   * Navigate to a URL and wait for DOM to load
   * @param {string} url - Target URL
   */
  async navigate(url) {
    await this.page.goto(url);
    await this.page.locator('.slds-spinner').waitFor({ state: 'hidden', timeout: 10000 });
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
    await this.toast.isVisible();
    return await this.toast.textContent();
  }

  /**
   * Get toast message content
   * @returns {Promise<string>} Toast message text
   */
  async getPrimaryField() {
    const primaryField = this.page.locator('[slot="primaryField"]')
    return await primaryField.textContent()
  }

  async waitForModal(){
    await this.modal.waitFor({ state: 'visible', timeout: 10000 });
  }

  async waitForModalDisappear(){
    await this.modal.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async waitForToast() {
    await this.toast.waitFor({ state: 'visible', timeout: 10000 });
  }

  async waitForToastDisappear() {
    await this.toast.waitFor({ state: 'hidden', timeout: 10000 });
  }

  /**
   * Wait until an element is visible or hidden
   * @param {Locator} element - Element Playwright (Locator)
   * @param {'visible'|'hidden'|'attached'|'detached'} state
   * @param {number} timeout
   */
  async waitForElement(element, state = 'visible', timeout = 10000) {
    await element.waitFor({ state, timeout });
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