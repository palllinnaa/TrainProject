import { Model, DataTypes, BuildOptions } from 'sequelize';
import { IContextContainer } from '../container';
import { IProductModel } from '../interfaces/products';

export type ProductType = typeof Model & {
    new(values?: object, options?: BuildOptions): IProductModel;
    init(): void;
}

export default (ctx: IContextContainer) => {
    const Products = <ProductType>ctx.db.define<IProductModel>('products', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        image: {
            type: DataTypes.STRING,
        },

        property: {
            type: DataTypes.STRING,
        },

        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        description: {
            type: DataTypes.STRING
        },

        ingredients: {
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
    },
        {
            timestamps: false
        }
    );

    ctx.Stores.hasMany(Products, {
        sourceKey: 'id',
        foreignKey: 'storeId',
    });

    Products.belongsTo(ctx.Stores);

    return Products;
}