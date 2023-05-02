import { Model, DataTypes, BuildOptions } from 'sequelize';
import db from '../db';
import Stores from './store';

const Reviews = db.define('reviews', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  reviewText: {
    allowNull: false,
    type: DataTypes.STRING
  },

  storeId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: "stores",
      key: 'id'
    },
  },

  rating: {
    type: DataTypes.INTEGER,
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

export default Reviews;