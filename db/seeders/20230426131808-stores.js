'use strict';
const { faker } = require('@faker-js/faker');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const stores=[];
    for (let index = 0; index < 50; index++) {
     
      stores.push({
        storeName: faker.company.name(),
        userId: faker.datatype.number({min: 2, max: 21})
      })
    }
    return queryInterface.bulkInsert('stores', stores, {});
  },
 

  async down (queryInterface) {
    return queryInterface.bulkDelete('stores', null, {});
  }
};

