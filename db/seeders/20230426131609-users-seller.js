'use strict';
const { faker } = require('@faker-js/faker');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const usersSeller=[];
    for (let index = 0; index < 20; index++) {
     
      usersSeller.push({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        role: 'seller' ,
        password: faker.internet.password() 
      })
    }
    return queryInterface.bulkInsert('users', usersSeller, {});
  },


  async down (queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
