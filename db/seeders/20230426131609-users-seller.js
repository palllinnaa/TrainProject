'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const slug = require('slug')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const usersSeller = [];
    for (let index = 0; index < 20; index++) {

      const password = faker.internet.password();
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      const slugName = slug(firstName + ' ' + lastName, '.');

      usersSeller.push({
        firstName: firstName,
        lastName: lastName,
        email: faker.internet.email(),
        role: 'seller',
        password: hash,
        slug: slugName
      })
    }
    return queryInterface.bulkInsert('users', usersSeller, {});
  },
  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
