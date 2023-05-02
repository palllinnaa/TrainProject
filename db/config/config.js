"use strict";
module.exports = {
  development: {
    username: "root",
    password: "qwerty",
    database: "foodstore",
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    debug: true
  },
};
// console.log('process.env.DB_USER----------------------', process.env.DB_USER);
// console.log('process.env.DB_PSWD----------------------', process.env.DB_PSWD);
// console.log('process.env.DB_NAME----------------------', process.env.DB_NAME);
// console.log('process.env.DB_HOST----------------------', process.env.DB_HOST);
// console.log('process.env.DB_PORT----------------------', process.env.MYSQL_HOST);
// 'use-strict'
// module.exports = {
//   development: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PSWD,
//     database: process.env.DB_NAME,
//     dialect: "mysql",
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     debug: true
//   },
// };
