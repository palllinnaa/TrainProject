import type { NextApiRequest, NextApiResponse } from 'next'
//import db from '../../db/models';
import Products from '../../server/models/product';
import { Product } from './../../src/interfaces';


// Fake users data
// export const products: Product[] = [
//     { id: 1, productName: 'Salad' },
//     { id: 2, productName: 'Sandwich' },
//     { id: 3, productName: 'Bread' },
//     { id: 4, productName: 'Steak' },
//     { id: 5, productName: 'Fish' },
//     { id: 6, productName: 'Rice' },
//     { id: 7, productName: 'Pizza' },
//     { id: 8, productName: 'Eggs' },
//     { id: 9, productName: 'Apple Juice' },
//     { id: 10, productName: 'Candy' }
// ]


// export const products: Product[] = [
//     {

//         id: 1,
//         productName: 'Salad',
//         image: '../images/products/salad.webp',
//         // organic: true,
//         // vegan: false,
//         property: ['organic'],
//         price: 80,
//         description: 'A salad is a dish consisting of mixed, mostly natural ingredients. They are typically served at room temperature or chilled, though some can be served warm. Condiments and salad dressings, which exist in a variety of flavors, are often used to enhance a salad.',
//         reviewCount: 34,
//         rating: 5,
//         // cookingTime: '10-15 min',
//         //ingredients: 'cucumbers, tomatoes, green bell pepper, red onion, olives, and feta cheese',
//         ingredients: ['cucumbers', 'tomatoes', 'green bell pepper', 'red onion', 'olives', 'feta cheese'],
//     },
//     {
//         id: 2,
//         productName: 'Sandwich',
//         image: '../images/products/sandwich.webp',
//         // organic: true,
//         // vegan: false,
//         property: ['organic'],
//         price: 50,
//         description: 'A sandwich is a food typically consisting of vegetables, sliced cheese or meat, placed on or between slices of bread, or more generally any dish wherein bread serves as a container or wrapper for another food type.',
//         reviewCount: 59,
//         rating: 4,
//         // cookingTime: '15-20 min',
//         ingredients: ['bread slices', 'cheese slices', 'mayonnaise sauce', 'salt', 'black pepper', 'mustard', 'lettuce leaves'],
//     },
//     {
//         id: 3,
//         productName: 'Bread',
//         image: '../images/products/bread.jpeg', 
//         // organic: true,
//         // vegan: false,
//         property: ['organic'],
//         price: 25,
//         description: 'Bread is a staple food prepared from a dough of flour (usually wheat) and water, usually by baking.',
//         reviewCount: 12,
//         rating: 5,
//         // cookingTime: '15-25 min',
//         ingredients: ['flour', 'yeast', 'sugar', 'salt', 'oil'],
//     },
//     {
//         id: 4,
//         productName: 'Steak',
//         image: '../images/products/steak.jpeg',
//         // organic: true,
//         // vegan: false,
//         property: ['organic'],
//         price: 220,
//         description: 'A steak is a thick cut of meat generally sliced across the muscle fibers, sometimes including a bone. It is normally grilled or fried. ',
//         reviewCount: 21,
//         rating: 5,
//         // cookingTime: '35-40 min',
//         ingredients: ['salt', 'garlic', 'black pepper', 'olive oil', 'onion', 'beef'],
//     },
//     {
//         id: 5,
//         productName: 'Fish',
//         image: '../images/products/fish.jpeg',
//         // organic: true,
//         // vegan: false,
//         property: ['organic'],
//         price: 120,
//         description: 'Fish dishes are distinct food dishes which use seafood (fish, shellfish or seaweed) as primary ingredients, and are ready to be served or eaten with any needed preparation or cooking completed.',
//         reviewCount: 18,
//         rating: 3,
//         // cookingTime: '30-45 min',
//         ingredients: ['fish', 'onion', 'salt', 'black pepper', 'lemon'],
//     },
//     {
//         id: 6,
//         productName: 'Rice',
//         image: '../images/products/rice.webp',
//         // organic: true,
//         // vegan: true,
//         property: ['organic', 'vegan'],
//         price: 75,
//         description: 'Rice is a staple diet for most of India. One of the most versatile ingredient, it can be cooked as an entree, mains or a dessert! ',
//         reviewCount: 9,
//         rating: 4,
//         // cookingTime: '15-20 min',
//         ingredients: ['rise', 'salt'],
//     },
//     {
//         id: 7,
//         productName: 'Pizza',
//         image: '../images/products/pizza.jpeg',
//         // organic: true,
//         // vegan: false,
//         property: ['organic'],
//         price: 75,
//         description: 'Pizza, dish of Italian origin consisting of a flattened disk of bread dough topped with some combination of olive oil, oregano, tomato, olives, mozzarella or other cheese, and many other ingredients, baked quickly—usually, in a commercial setting, using a wood-fired oven heated to a very high temperature—and served hot.',
//         reviewCount: 34,
//         rating: 4,
//         // cookingTime: '20-25 min',
//         ingredients: ['flour', 'dry yeast', 'onion', 'tomato', 'cheese', 'salami'],
//     },
//     {
//         id: 8,
//         productName: 'Eggs',
//         image: '../images/products/eggs.jpeg',
//         // organic: true,
//         // vegan: false,
//         property: ['organic'],
//         price: 59,
//         description: 'Poached eggs on Canadian bacon on top of toasted English muffin halves covered with hollandaise sauce.',
//         reviewCount: 23,
//         rating: 4,
//         // cookingTime: '5-15 min',
//         ingredients: ['eggs', 'salt', 'black pepper'],
//     },
//     {
//         id: 9,
//         productName: 'Apple Juice',
//         image: '../images/products/apple_juice.jpeg',
//         // organic: true,
//         // vegan: true,
//         property: ['organic', 'vegan'], 
//         price: 20,
//         description: 'A type of fruit juice that is made from the pulp of apples processed for their juice. It is a very clear liquid from which the pulp has been removed. ',
//         reviewCount: 56,
//         rating: 5,
//         // cookingTime: '5-10 min',
//         ingredients: ['apple'],
//     },
//     {
//         id: 10,
//         productName: 'Candy',
//         image: '../images/products/candy.webp',
//         // organic: true,
//         // vegan: true,
//         property: ['organic', 'vegan'], 
//         price: 38,
//         description: 'Candy is a confection that features sugar as a principal ingredient. The category, called sugar confectionery, encompasses any sweet confection, including chocolate, chewing gum, and sugar candy.',
//         reviewCount: 29,
//         rating: 3,
//         // cookingTime: '10-15 min',
//         ingredients: ['sugar/honey', 'water/milk', 'orange/strawberry/apple/cherry'],
//     },

// ]

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<Product[]>
) {
    const result = await Products.findAll({
        attributes: ['id', 'productName', 'image', 'property', 'price', 'description']
    });
    const data = JSON.parse(JSON.stringify(result));
  
    const products = data.map((item) => ({
      ...item,
      property: item.property.split(';'),
     }));
    res.status(200).json(products)
    // Get data from your database
    //res.status(200).json(product)
}

// npx sequelize-cli model:generate --name Product --attributes id:number,productName:string,image:string,property:string,price:number,description:string,ingredients:string