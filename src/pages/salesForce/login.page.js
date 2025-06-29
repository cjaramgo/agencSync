const BasePage = require('../base.page');

class LoginPage extends BasePage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        super(page);
        this.usernameInput = this.page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Log In' });
    }

    /**
    * Go to Salesforce Login
    * @param {string} url - Salesforce Login url
    */
    async goto(url) {
        console.log('🔗 Navigating to:', url);
        await this.page.goto(url);
    }
    
    /**
    * Login to Salesforce
    * @param {string} username - Salesforce username
    * @param {string} password - Salesforce password
    */
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
module.exports = { LoginPage };