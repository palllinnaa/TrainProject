import { BuildOptions, DataTypes, Model } from 'sequelize';
import { IServerContextContainer } from '../container';
import { IStoreModel } from '../interfaces/stores';

export type StoreType = typeof Model & {
  new(values?: object, options?: BuildOptions): IStoreModel;
  init(): void;
}

export default (ctx: IServerContextContainer) => {
  const Stores = <StoreType>ctx.db.define<IStoreModel>('stores', {
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
  },
    {
      timestamps: false
    }
  );

  ctx.Users.hasMany(Stores, {
    sourceKey: 'id',
    foreignKey: 'userId',
  });

  Stores.belongsTo(ctx.Users);

  return Stores;
}