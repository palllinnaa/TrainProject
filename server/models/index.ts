import { asFunction } from "awilix";
import Products, { ProductType } from "./product";
import Reviews, { ReviewType } from "./review";
import Stores, { StoreType } from "./store";
import Users, { UserType } from "./user";

export interface IModelContainer {
    Users: UserType;
    Stores: StoreType;
    Reviews: ReviewType;
    Products: ProductType;
}

export default {
    Users: asFunction(Users).singleton(),
    Stores: asFunction(Stores).singleton(),
    Reviews: asFunction(Reviews).singleton(),
    Products: asFunction(Products).singleton(),
}