import { asClass } from 'awilix'
import UserSaga from './user'
import AuthSaga from './auth'
import StoreSaga from './store'
import ReviewSaga from './review'
import ProductSaga from './product'

export interface IEntityContainer {
    UserSaga: UserSaga;
    AuthSaga: AuthSaga;
    StoreSaga: StoreSaga;
    ReviewSaga: ReviewSaga;
    ProductSaga: ProductSaga;
}

export default {
    UserSaga: asClass(UserSaga).singleton(),
    AuthSaga: asClass(AuthSaga).singleton(),
    StoreSaga: asClass(StoreSaga).singleton(),
    ReviewSaga: asClass(ReviewSaga).singleton(),
    ProductSaga: asClass(ProductSaga).singleton()
}