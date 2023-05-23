import { asClass } from 'awilix';
import ProductController from './product';
import ReviewController from './review';
import StoreController from './store';
import UserController from './user';

export interface IControllerContainer {
    UserController: UserController;
    StoreController: StoreController;
    ReviewController: ReviewController;
    ProductController: ProductController;
}

export default {
    UserController: asClass(UserController).singleton(),
    StoreController: asClass(StoreController).singleton(),
    ReviewController: asClass(ReviewController).singleton(),
    ProductController: asClass(ProductController).singleton()
}