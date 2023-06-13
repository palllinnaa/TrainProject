import Entity from "../../src/models/entity"
import { call, put, take, all } from 'redux-saga/effects'
import { productSaga } from "../../server/constants";
import { productByIdFetchFailed, productByIdFetchSucceeded, productsFetchFailed, productsFetchSucceeded } from "../actions/product";

export default class ProductSaga extends Entity {
    protected * fetchProducts() {
        while (true) {
            yield take('PRODUCTS_REQUEST');
            try {
                const products = yield call(this.readData, 'products')
                yield put(productsFetchSucceeded(products))
            } catch (error) {
                yield put(productsFetchFailed(error.message))
            }
        }
    }

    protected * fetchProductById() {
        while (true) {
            const data = yield take('PRODUCT_BY_ID_REQUEST');
            try {
                const product = yield call(this.readData, `product/${data.payload}`)
                yield put(productByIdFetchSucceeded([product]))
            } catch (error) {
                yield put(productByIdFetchFailed(error.message))
            }
        }
    }

    public * myProductSaga() {
        yield all([
            productSaga.fetchProducts(),
            productSaga.fetchProductById(),
        ])
    }
}