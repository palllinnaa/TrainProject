import { BuildOptions, DataTypes, Model } from 'sequelize';
import { IContextContainer } from '../container';
import { IUserModel } from '../interfaces/users';
const bcrypt = require('bcrypt');

export type UserType = typeof Model & {
  new(values?: object, options?: BuildOptions): IUserModel;
  init(): void;
}

export default (ctx: IContextContainer) => {
  const Users = <UserType>ctx.db.define<IUserModel>('users', {
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
  },
    {
      timestamps: false
    }
  );

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

  return Users;
};