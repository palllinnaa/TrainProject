'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const slug = require('slug')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {

    const firstName = 'Admin'
    const lastName = 'Admin'
    const slugName = slug(firstName + ' ' + lastName, '.');
    const password = faker.internet.password();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const userAdmin = [{
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email(),
      role: 'admin',
      password: hash,
      slug: slugName
    }]
    return queryInterface.bulkInsert('users', userAdmin, {});
},
  async down(queryInterface) {
  return queryInterface.bulkDelete('users', null, {});
}
};
