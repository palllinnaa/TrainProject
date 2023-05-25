import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface IReviewModel extends Model<InferAttributes<IReviewModel>, InferCreationAttributes<IReviewModel>> {
    id: number;
    reviewText: string;
    rating: number;
    storeId: number;
    userId: number;
  }
  