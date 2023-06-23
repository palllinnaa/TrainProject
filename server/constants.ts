import ProductSaga from "../redux/models/product";
import ReviewSaga from "../redux/models/review";
import StoreSaga from "../redux/models/store";
import UserSaga from "../redux/models/user";
import AuthSaga from '../redux/models/auth';

export enum Roles {
  ADMIN = "admin",
  SELLER = "seller",
  USER = "user"
}

export enum METHODS {
  GET = "GET",
  POST = "POST"
}

export const userSaga = new UserSaga;
export const authSaga = new AuthSaga;
export const storeSaga = new StoreSaga;
export const reviewSaga = new ReviewSaga;
export const productSaga = new ProductSaga;

export const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;