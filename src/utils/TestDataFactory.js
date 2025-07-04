const { faker } = require('@faker-js/faker');

class TestDataFactory {
  
  static generateAccount() {
    return {
      accountName: faker.company.name(),
      phoneNumber: faker.phone.number('+1-###-###-####'),
      website: faker.internet.url()
    };  
  }

  static generateEmail(firstName, lastName) {
    const domain = faker.internet.domainName();
    const clean = (str) => str.replace(/[^a-z]/g, '');
    
    return `${clean(firstName.toLowerCase())}.${clean(lastName.toLowerCase())}@${domain}`;
  }

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