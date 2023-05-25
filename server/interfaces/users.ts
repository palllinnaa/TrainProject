import { InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Roles } from "../constants";

export interface IUserModel extends Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: Roles;
    slug: string;
  }
  