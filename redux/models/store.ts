import Entity from "./entity"
import { call } from 'redux-saga/effects'
import { schema } from "normalizr";
import action from "../decorators/action";

export default class StoreSaga extends Entity {
    constructor(opts: any) {
        super(opts);
        this.initSchema('stores', {
            user: new schema.Entity('users'),
            review: [new schema.Entity('reviews')],
            product: [new schema.Entity('products')]
        });
    }

    @action()
    protected * fetchStores(params) {
        yield call(this.readData, `stores`, params.payload, { page: params.payload.page, limit: params.payload.perPage});
    }

    @action()
    protected * fetchStoreById(data) {
        yield call(this.readData, `store/${data.payload}`);
    }
}