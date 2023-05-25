import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface IProductModel extends Model<InferAttributes<IProductModel>, InferCreationAttributes<IProductModel>> {
    id: number;
    productName: string;
    image: string;
    property: string;
    price: number;
    description: string;
    ingredients: string;
    storeId: number;
}
