import Entity from "./entity"
import { call, take, all } from 'redux-saga/effects'
import { productSaga } from "../../server/constants";

export default class ProductSaga extends Entity {
    constructor() {
        super('products');
    }
    
    protected * fetchProducts() {
        while (true) {
            yield take('PRODUCTS_REQUEST');
            yield call(this.readData, 'products', this.entityName)
        }
    }

    protected * fetchProductById() {
        while (true) {
            const data = yield take('PRODUCT_BY_ID_REQUEST');
            yield call(this.readData, `product/${data.payload}`, this.entityName)
        }
    }

    public * myProductSaga() {
        yield all([
            productSaga.fetchProducts(),
            productSaga.fetchProductById()
        ])
    }
}