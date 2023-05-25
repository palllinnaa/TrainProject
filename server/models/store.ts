import { BuildOptions, DataTypes, Model } from 'sequelize';
import { IContextContainer } from '../container';
import { IStoreModel } from '../interfaces/stores';

export type StoreType = typeof Model & {
  new(values?: object, options?: BuildOptions): IStoreModel;
  init(): void;
}

export default (ctx: IContextContainer) => {
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

  Stores.init = (): any => {
    Stores.hasMany(ctx.Reviews, {
      sourceKey: 'id',
      foreignKey: 'storeId',
    });
    Stores.hasMany(ctx.Products, {
      sourceKey: 'id',
      foreignKey: 'storeId',
    });
    Stores.belongsTo(ctx.Users);
  }

  return Stores;
}