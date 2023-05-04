import { DataTypes, } from 'sequelize';
import db from '../db';
import { IReviewModel } from '../interfaces/reviews';


const Reviews = db.define<IReviewModel>('reviews', {
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