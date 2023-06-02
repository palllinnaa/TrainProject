import { InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { IProduct } from "./common";

export interface IProductModel extends Model<
    InferAttributes<IProductModel>,
    InferCreationAttributes<IProductModel>>,
    IProduct { }
