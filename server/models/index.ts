import { asFunction } from "awilix";
import Products, { ProductType } from "./product";
import Reviews, { ReviewType } from "./review";
import Stores, { StoreType } from "./store";
import Users, { UserType } from "./user";

export interface IModelContainer {
    initModels: () => void;
    Users: UserType;
    Stores: StoreType;
    Reviews: ReviewType;
    Products: ProductType;
}

const initModels = (ctx) => {
    const { Users, Stores, Products, Reviews } = ctx;
    return () => {
        Users.init();
        Stores.init();
        Products.init();
        Reviews.init();
    }
}

export default {
    initModels: asFunction(initModels).singleton(),
    Users: asFunction(Users).singleton(),
    Stores: asFunction(Stores).singleton(),
    Reviews: asFunction(Reviews).singleton(),
    Products: asFunction(Products).singleton(),
}