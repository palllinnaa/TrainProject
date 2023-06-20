import { normalize, schema } from 'normalizr';
import ProductSaga from "../redux/models/product";
import ReviewSaga from "../redux/models/review";
import StoreSaga from "../redux/models/store";
import UserSaga from "../redux/models/user";
import Entity from "../redux/models/entity";
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

export const entity = new Entity('');
export const userSaga = new UserSaga;
export const authSaga = new AuthSaga;
export const storeSaga = new StoreSaga;
export const reviewSaga = new ReviewSaga;
export const productSaga = new ProductSaga;

export const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;

export default function normalizationSchema(entityName: string, data: any) {
  const usersSchema = new schema.Entity('users');
  const authSchema = new schema.Entity('identity');
  const reviewsSchema = new schema.Entity('reviews')
  const storesSchema = new schema.Entity('stores', {
    user: usersSchema,
    review: [reviewsSchema]
  });
  const reviewsUsersSchema = new schema.Entity('reviews', {
    user: usersSchema,
    store: storesSchema
  });
  const productsSchema = new schema.Entity('products');

  function normalizeSwitch() {
    let normalizeSchema = {};
    switch (entityName) {
      case 'users':
        normalizeSchema = usersSchema
        break;
      case 'identity':
        normalizeSchema = authSchema
        break;
      case 'stores':
        normalizeSchema = storesSchema
        break;
      case 'reviews':
        normalizeSchema = reviewsUsersSchema;
        break;
      case 'products':
        normalizeSchema = productsSchema;
        break;
    }
    return normalizeSchema;
  }

  const normalizeSchema = normalizeSwitch();
  const normalizedData = normalize(data, Array.isArray(data) ? [normalizeSchema] : normalizeSchema);
  return normalizedData;
}