import { Model, DataTypes, BuildOptions } from 'sequelize';
import db from '../db';
import Reviews from './review';
import Stores from './store';


const Users = db.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING
  },

  email: {
    allowNull: false,
    type: DataTypes.STRING
  },

  role: {
    allowNull: false,
    type: DataTypes.STRING
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING
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

Users.hasMany(Reviews);
Reviews.belongsTo(Users, {foreignKey: 'userId'});

Users.hasMany(Stores);
Stores.belongsTo(Users, {foreignKey: 'userId'});

export default Users;