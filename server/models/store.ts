import { Model, DataTypes, BuildOptions } from 'sequelize';
import db from '../db';
import Products from './product';
import Reviews from './review';

const Stores = db.define('stores', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  storeName: {
    allowNull: false,
    type: DataTypes.STRING
  },

  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: 'id'
    },
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Stores.hasMany(Reviews);
Reviews.belongsTo(Stores), {foreignKey: 'storeId'};

Stores.hasMany(Products);
Products.belongsTo(Stores, {foreignKey: 'storeId'});

export default Stores;
