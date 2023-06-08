import { readData, saveData } from './../src/models/entity';
import { call, put, take, all } from 'redux-saga/effects'
import { loginUserFetchFailed, loginUserFetchSucceeded, registerUserFetchFailed, registerUserFetchSucceeded, userByIdFetchFailed, userByIdFetchSucceeded, usersFetchFailed, usersFetchSucceeded } from './actions/user';
import { storeByIdFetchFailed, storeByIdFetchSucceeded, storesFetchFailed, storesFetchSucceeded } from './actions/store';
import { reviewByIdFetchFailed, reviewByIdFetchSucceeded, reviewsFetchFailed, reviewsFetchSucceeded, reviewsUserByIdFetchFailed, reviewsUserByIdFetchSucceeded, reviewsUsersFetchFailed, reviewsUsersFetchSucceeded } from './actions/review';
import { productByIdFetchFailed, productByIdFetchSucceeded, productsFetchFailed, productsFetchSucceeded } from './actions/product';

function* fetchUsers() {
    while (true) {
        yield take('USERS_REQUEST');
        try {
            const users = yield call(readData, 'users')
            yield put(usersFetchSucceeded(users))
        } catch (error) {
            yield put(usersFetchFailed(error.message))
        }
    }
}

function* fetchUserById() {
    while (true) {
        const action = yield take('USER_BY_ID_REQUEST');
        try {
            const user = yield call(readData, `user/${action.id}`)
            yield put(userByIdFetchSucceeded(user))
        } catch (error) {
            yield put(userByIdFetchFailed(error.message))
        }
    }
}

function* fetchStores() {
    while (true) {
        yield take('STORES_REQUEST')
        try {
            const stores = yield call(readData, 'stores')
            yield put(storesFetchSucceeded(stores))
        } catch (error) {
            yield put(storesFetchFailed(error.message))
        }
    }
}

function* fetchStoreById() {
    while (true) {
        const action = yield take('STORE_BY_ID_REQUEST');
        try {
            const store = yield call(readData, `store/${action.id}`)
            yield put(storeByIdFetchSucceeded(store))
        } catch (error) {
            yield put(storeByIdFetchFailed(error.message))
        }
    }
}

function* fetchReviews() {
    while (true) {
        yield take('REVIEWS_REQUEST');
        try {
            const reviews = yield call(readData, 'reviews')
            yield put(reviewsFetchSucceeded(reviews))
        } catch (error) {
            yield put(reviewsFetchFailed(error.message))
        }
    }
}

function* fetchReviewById() {
    while (true) {
        const action = yield take('REVIEW_BY_ID_REQUEST');
        try {
            const review = yield call(readData, `review/${action.id}`)
            yield put(reviewByIdFetchSucceeded(review))
        } catch (error) {
            yield put(reviewByIdFetchFailed(error.message))
        }
    }
}

function* fetchReviewsUsers() {
    while (true) {
        yield take('REVIEWS_USERS_REQUEST');
        try {
            const reviewsUsers = yield call(readData, 'reviewsUsers')
            yield put(reviewsUsersFetchSucceeded(reviewsUsers))
        } catch (error) {
            yield put(reviewsUsersFetchFailed(error.message))
        }
    }
}

function* fetchReviewsUserById() {
    while (true) {
        const action = yield take('REVIEWS_USER_BY_ID_REQUEST');
        try {
            const reviewsUser = yield call(readData, `reviewsUser/${action.id}`)
            yield put(reviewsUserByIdFetchSucceeded(reviewsUser))
        } catch (error) {
            yield put(reviewsUserByIdFetchFailed(error.message))
        }
    }
}

function* fetchProducts() {
    while (true) {
        yield take('PRODUCTS_REQUEST');
        try {
            const products = yield call(readData, 'products')
            yield put(productsFetchSucceeded(products))
        } catch (error) {
            yield put(productsFetchFailed(error.message))
        }
    }
}

function* fetchProductById() {
    while (true) {
        const action = yield take('PRODUCT_BY_ID_REQUEST');
        try {
            const product = yield call(readData, `product/${action.id}`)
            yield put(productByIdFetchSucceeded(product))
        } catch (error) {
            yield put(productByIdFetchFailed(error.message))
        }
    }
}

function* fetchLoginUser() {
    while (true) {
        const data = yield take('LOGIN_USER_REQUEST');
        try {
            const identity = yield call(saveData, 'login', data.body)
            yield put(loginUserFetchSucceeded(identity))
        } catch (error) {
            yield put(loginUserFetchFailed(error))
        }
    }
}

function* fetchRegisterUser() {
    while (true) {
        const data = yield take('REGISTER_USER_REQUEST');
        try {
            const identity = yield call(saveData, 'register', data.body)
            yield put(registerUserFetchSucceeded(identity))
        } catch (error) {
            yield put(registerUserFetchFailed(error))

        }
    }
}

export default function* mySaga() {
    yield all([
        fetchUsers(),
        fetchUserById(),
        fetchStores(),
        fetchStoreById(),
        fetchReviews(),
        fetchReviewById(),
        fetchReviewsUsers(),
        fetchReviewsUserById(),
        fetchProducts(),
        fetchProductById(),
        fetchLoginUser(),
        fetchRegisterUser()
    ])
}