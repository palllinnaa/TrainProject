import { Model, DataTypes, BuildOptions } from 'sequelize';
import db from '../db';

const Products = db.define('products', {
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

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

export default Products;