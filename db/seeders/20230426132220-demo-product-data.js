'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
      const fields = [{
      productName: 'Salad',
      image: '../images/products/salad.webp',
      property: 'organic',
      price: 80,
      description: 'A salad is a dish consisting of mixed, mostly natural ingredients. They are typically served at room temperature or chilled, though some can be served warm. Condiments and salad dressings, which exist in a variety of flavors, are often used to enhance a salad.',
      ingredients: 'cucumbers;tomatoes;green bell pepper;red onion;olives;feta cheese',
      storeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'Sandwich',
      image: '../images/products/sandwich.webp',
      property: 'organic',
      price: 50,
      description: 'A sandwich is a food typically consisting of vegetables, sliced cheese or meat, placed on or between slices of bread, or more generally any dish wherein bread serves as a container or wrapper for another food type.',
      ingredients: 'bread slices;cheese slices;mayonnaise sauce;salt;black pepper;mustard;lettuce leaves',
      storeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'Bread',
      image: '../images/products/bread.jpeg',
      property: 'organic',
      price: 25,
      description: 'Bread is a staple food prepared from a dough of flour (usually wheat) and water, usually by baking.',
      ingredients: 'flour;yeast;sugar;salt;oil',
      storeId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'Steak',
      image: '../images/products/steak.jpeg',
      property: 'organic',
      price: 220,
      description: 'A steak is a thick cut of meat generally sliced across the muscle fibers, sometimes including a bone. It is normally grilled or fried. ',
      ingredients: 'salt;garlic;black pepper;olive oil;onion;beef',
      storeId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'Fish',
      image: '../images/products/fish.jpeg',
      property: 'organic',
      price: 120,
      description: 'Fish dishes are distinct food dishes which use seafood (fish, shellfish or seaweed) as primary ingredients, and are ready to be served or eaten with any needed preparation or cooking completed.',
      ingredients: 'fish;onion;salt;black pepper;lemon',
      storeId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'Rice',
      image: '../images/products/rice.webp',
      property: 'organic;vegan',
      price: 75,
      description: 'Rice is a staple diet for most of India. One of the most versatile ingredient, it can be cooked as an entree, mains or a dessert! ',
      ingredients: 'rise;salt',
      storeId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'Pizza',
      image: '../images/products/pizza.jpeg',
      property: 'organic',
      price: 75,
      description: 'Pizza, dish of Italian origin consisting of a flattened disk of bread dough topped with some combination of olive oil, oregano, tomato, olives, mozzarella or other cheese, and many other ingredients, baked quickly—usually, in a commercial setting, using a wood-fired oven heated to a very high temperature—and served hot.',
      ingredients: 'flour;dry yeast;onion;tomato;cheese;salami',
      storeId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'Eggs',
      image: '../images/products/eggs.jpeg',
      property: 'organic',
      price: 59,
      description: 'Poached eggs on Canadian bacon on top of toasted English muffin halves covered with hollandaise sauce.',
      ingredients: 'eggs;salt;black pepper',
      storeId: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'Apple Juice',
      image: '../images/products/apple_juice.jpeg',
      property: 'organic vegan',
      price: 20,
      description: 'A type of fruit juice that is made from the pulp of apples processed for their juice. It is a very clear liquid from which the pulp has been removed. ',
      ingredients: 'apple',
      storeId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'Candy',
      image: '../images/products/candy.webp',
      property: 'organic;vegan',
      price: 38,
      description: 'Candy is a confection that features sugar as a principal ingredient. The category, called sugar confectionery, encompasses any sweet confection, including chocolate, chewing gum, and sugar candy.',
      ingredients: 'sugar/honey;water/milk;orange/strawberry/apple/cherry',
      storeId: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
    return queryInterface.bulkInsert('products', fields, {});
  },
  async down(queryInterface) {
    return queryInterface.bulkDelete('products', null, {});
  }
};
