import { DataTypes } from 'sequelize';
import db from '../db';
import { IUserModel } from '../interfaces/users';
import Reviews from './review';
import Stores from './store';
const bcrypt = require('bcrypt');

const Users = db.define<IUserModel>('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  firstName: {
    allowNull: false,
    type: DataTypes.STRING
  },

  lastName: {
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

  slug: {
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
Reviews.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(Stores);
Stores.belongsTo(Users, { foreignKey: 'userId' });

Users.beforeCreate(async (user) => {
  try {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    }
  } catch (err) {
    throw new Error(err);
  }
});

export default Users;