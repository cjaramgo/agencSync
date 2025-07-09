const { faker } = require('@faker-js/faker');

/**
 * @typedef {Object} Account
 * @property {string} accountName
 * @property {string} phoneNumber
 * @property {string} website
 */

/**
 * @typedef {Object} Contact
 * @property {string} salutation
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} phoneNumber
 * @property {string} email
 * @property {string} fullName
 */

/**
 * @class TestDataFactory
 * @description Factory for generating test data using Faker
 */

class TestDataFactory {
  
  /** @returns {Account} */
  static generateAccount() {
    return {
      accountName: faker.company.name(),
      phoneNumber: faker.phone.number('+1-###-###-####'),
      website: faker.internet.url()
    };  
  }

  /** 
   * @param {string} firstName 
   * @param {string} lastName 
   * @returns {string} 
   * */
  static generateEmail(firstName, lastName) {
    const domain = faker.internet.domainName();
    const clean = (str) => str.replace(/[^a-z]/g, '');
    
    return `${clean(firstName.toLowerCase())}.${clean(lastName.toLowerCase())}@${domain}`;
  }

  /** @returns {Contact} */
  static generateContact() {
    const salutations = ['Mr.', 'Ms.', 'Mrs.'];
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      salutation: faker.helpers.arrayElement(salutations),
      firstName: firstName,
      lastName: lastName,
      phoneNumber: faker.phone.number('+1-###-###-####'),
      email: TestDataFactory.generateEmail(firstName, lastName),
      fullName: `${firstName} ${lastName}`
    };
  }


}
module.exports = TestDataFactory;