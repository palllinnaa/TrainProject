// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
// const db = {};

// console.log('config------------------', config);

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// // fs.readdirSync(path.join(__dirname, 'models'))
// //   .filter(file => file.endsWith('.js'))
// //   .forEach(file => {
// //     const model = require(path.join(__dirname, 'models', file))(sequelize, DataTypes);
// //     sequelize[model.name] = model;
// //   });

// // // Synchronize the models with the database
// // sequelize.sync();





// // fs.readdirSync(path.join(__dirname, 'models'))
// //   .filter(file => file.endsWith('.js'))
// //   .forEach(file => {
// //     const model = require(path.join(__dirname, 'models', file))(sequelize, Sequelize.DataTypes);
// //     db[model.name] = model;
// //   });

// // // Synchronize the models with the database
// // sequelize.sync();



// // fs
// //   .readdirSync(path.join(__dirname, 'models'))
// //   .filter(file => {
// //     return (
// //       file.indexOf('.') !== 0 &&
// //       file !== basename &&
// //       file.slice(-3) === '.js' &&
// //       file.indexOf('.test.js') === -1
// //     );
// //   })
// //   .forEach(file => {
// //     console.log('__dirname-------------------', __dirname);
// //     console.log('file-------------------', file);

// //     const model = require(path.join(__dirname, "models", file))(sequelize, DataTypes);
// //     db[model.name] = model;
// //   });









// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     console.log('__dirname-------------------', __dirname);
//     console.log('file-------------------', file);

//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

// --------------------------------------------VERSION 2---------------------------------------------------------



'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

/* Custom handler for reading current working directory */
const models = process.cwd() + '/db/models/' || __dirname;

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}
/* fs.readdirSync(__dirname) */
fs.readdirSync(models)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    // TODO fix Error: Cannot find module '/home/golden-team/projects/Polina/Train/db/models/product.js'
    try {
      const model = require(path.join(models, file));
      db[model.name] = model;
    } catch (error) {
      console.log('error-------------------------------------', error)
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
