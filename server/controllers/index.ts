import { asClass } from 'awilix';
import AuthController from './authController';
import ProductController from './product';
import ReviewController from './review';
import StoreController from './store';
import UserController from './user';

export interface IControllerContainer {
    UserController: UserController;
    StoreController: StoreController;
    ReviewController: ReviewController;
    ProductController: ProductController;
    AuthController: AuthController;
}

export default {
    UserController: asClass(UserController).singleton(),
    StoreController: asClass(StoreController).singleton(),
    ReviewController: asClass(ReviewController).singleton(),
    ProductController: asClass(ProductController).singleton(),
    AuthController: asClass(AuthController).singleton()
}