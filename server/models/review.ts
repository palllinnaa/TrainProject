import { BuildOptions, DataTypes, Model, } from 'sequelize';
import { IContextContainer } from '../container';
import { IReviewModel } from '../interfaces/reviews';

export type ReviewType = typeof Model & {
  new(values?: object, options?: BuildOptions): IReviewModel;
  init(): void;
}

export default (ctx: IContextContainer) => {
  const Reviews = <ReviewType>ctx.db.define<IReviewModel>('reviews', {
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
  },
    {
      timestamps: false
    }
  );

  ctx.Users.hasMany(Reviews, {
    sourceKey: 'id',
    foreignKey: 'userId',
  });

  Reviews.belongsTo(ctx.Users);

  ctx.Stores.hasMany(Reviews, {
    sourceKey: 'id',
    foreignKey: 'storeId',
  });

  Reviews.belongsTo(ctx.Stores);

  return Reviews;
}