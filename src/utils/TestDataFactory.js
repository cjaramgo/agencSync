const { faker } = require('@faker-js/faker');

class TestDataFactory {
  
  static generateAccount() {
    return {
      accountName: faker.company.name(),
      phoneNumber: faker.phone.number('+1-###-###-####'),
      website: faker.internet.url()
    };  
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
      email: faker.internet.email(),
      fullName: `${firstName} ${lastName}`
    };
  }
}
module.exports = TestDataFactory;