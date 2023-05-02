'use strict';
const { faker } = require('@faker-js/faker');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const reviews=[];
    for (let index = 0; index < 300; index++) {
     
      reviews.push({
        reviewText: faker.lorem.sentences(faker.datatype.number({min: 1, max: 5})),
        rating: faker.datatype.number({min: 1, max:5}),
        storeId: faker.datatype.number({min: 1, max: 50}),
        userId: faker.datatype.number({min: 22, max: 121})
      })
    }
    return queryInterface.bulkInsert('reviews', reviews, {});
  },
 

  async down (queryInterface) {
    return queryInterface.bulkDelete('reviews', null, {});
  }
};

