'use strict';
const { faker } = require('@faker-js/faker');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const products = [];
    for (let index = 0; index < 1000; index++) {

      products.push({
        productName: faker.commerce.productName(),
        image: faker.image.food(),
        property: faker.helpers.arrayElement(['organic', 'vegan', 'organic;vegan']),
        price: faker.commerce.price(10, 250, 0),
        description: faker.commerce.productDescription(),
        ingredients: (faker.helpers.arrayElements([
          'cucumbers',
          'tomatoes',
          'green bell pepper',
          'red onion',
          'olives',
          'feta cheese',
          'bread slices',
          'mayonnaise sauce',
          'mustard',
          'lettuce leaves',
          'flour',
          'yeast',
          'sugar',
          'salt',
          'oil',
          'garlic',
          'black pepper',
          'olive oil',
          'onion',
          'beef',
          'fish',
          'lemon',
          'rise',
          'dry yeast',
          'cheese',
          'salami',
          'eggs',
          'honey',
          'water',
          'milk',
          'orange',
          'strawberry',
          'apple',
          'cherry'], faker.datatype.number({ min: 2, max: 10 }))).join(';'),
        storeId: faker.datatype.number({ min: 1, max: 50 })
      })
    }
    return queryInterface.bulkInsert('products', products, {});
  },


  async down(queryInterface) {
    return queryInterface.bulkDelete('products', null, {});
  }
};
