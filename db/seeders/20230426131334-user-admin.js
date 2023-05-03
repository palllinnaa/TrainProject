'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const userAdmin = [{
      name: 'Admin',
      email: faker.internet.email(),
      role: 'admin',
      password: faker.internet.password()
    }]
    return queryInterface.bulkInsert('users', userAdmin, {});
},
  async down(queryInterface) {
  return queryInterface.bulkDelete('users', null, {});
}
};
