const { request } = require('@playwright/test');

class SalesforceAPIClient {

  constructor() {
    this.clientId = process.env.SF_CLIENT_ID;
    this.clientSecret = process.env.SF_CLIENT_SECRET;
    this.username = process.env.SF_USERNAME;
    this.password = process.env.SF_PASSWORD;
    this.securityToken = process.env.SF_SECURITY_TOKEN
    this.loginUrl = process.env.SF_LOGIN_URL
    this.accessToken = null;
    this.instanceUrl = null;
    this.apiContext = null;
  }

  async authenticate() {
    const context = await request.newContext();
    const response = await context.post(`${this.loginUrl}/services/oauth2/token`, {
      form: {
        grant_type: 'password',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        username: this.username,
        password: this.password+this.securityToken,
      },
    });

    if (!response.ok()) {
      const error = await response.json();
      throw new Error(`Salesforce auth failed: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    this.instanceUrl = data.instance_url;
    this.apiContext = await request.newContext({
      baseURL: this.instanceUrl,
      extraHTTPHeaders: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async create(objectType, fields) {
    if (!this.apiContext) await this.authenticate();

    const response = await this.apiContext.post(`/services/data/v60.0/sobjects/${objectType}`, {
      data: fields,
    });

    const data = await response.json();

    if (!response.ok()) {
      throw new Error(`Create ${objectType} failed: ${JSON.stringify(data)}`);
    }

    return data.id;
  }

  async delete(objectType, id) {
    if (!this.apiContext) await this.authenticate();

    const response = await this.apiContext.delete(`/services/data/v60.0/sobjects/${objectType}/${id}`);
    return response.ok();
  }

  async query(soql) {
    if (!this.apiContext) {
      await this.authenticate();
    }

    const response = await this.apiContext.get(`/services/data/v60.0/query`, {
      params: {
        q: soql,
      },
    });

    if (!response.ok()) {
      const error = await response.json();
      throw new Error(`Query failed: ${JSON.stringify(error)}`);
    }

    return await response.json();
  }

  async close() {
    if (this.apiContext) {
      await this.apiContext.dispose();
    }
  }
}

module.exports = SalesforceAPIClient;
