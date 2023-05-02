'use strict';
const { faker } = require('@faker-js/faker');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const users=[];
    for (let index = 0; index < 100; index++) {
     
      users.push({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        role: 'user',
        password: faker.internet.password() 
      })
    }
    return queryInterface.bulkInsert('users', users, {});
  },
 

  async down (queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
