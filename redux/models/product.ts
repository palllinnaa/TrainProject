import Entity from "./entity"
import { call, take, all } from 'redux-saga/effects'
import { schema } from "normalizr";

export default class ProductSaga extends Entity {
    constructor() {
        super('products', {
            store: new schema.Entity('stores')
        });
        this.myProductSaga = this.myProductSaga.bind(this); 
    }
    
    protected * fetchProducts() {
        while (true) {
            yield take('PRODUCTS_REQUEST');
            yield call(this.readData, 'products')
        }
    }

    protected * fetchProductById() {
        while (true) {
            const data = yield take('PRODUCT_BY_ID_REQUEST');
            yield call(this.readData, `product/${data.payload}`)
        }
    }

    public * myProductSaga() {
        yield all([
            this.fetchProducts(),
            this.fetchProductById()
        ])
    }
}