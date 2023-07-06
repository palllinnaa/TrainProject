import Entity from "./entity"
import { call } from 'redux-saga/effects'
import { schema } from "normalizr";
import action from "../decorators/action";

export default class ProductSaga extends Entity {
    constructor(opts: any) {
        super(opts);
        this.initSchema('products', {
            store: new schema.Entity('stores')
        });
    }

    @action()
    protected * fetchProducts() {
        yield call(this.readData, 'products');
    }

    @action()
    protected * fetchProductById(data) {
        yield call(this.readData, `product/${data.payload}`);
    }
}