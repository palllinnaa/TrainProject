import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface IStoreModel extends Model<InferAttributes<IStoreModel>, InferCreationAttributes<IStoreModel>> {
    id: number;
    storeName: string;
    userId: number;
    updatedAt: Date;
    createdAt: Date;
  }
  