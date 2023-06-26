import Entity from "./entity"
import { call, take, all } from 'redux-saga/effects'
import { schema } from "normalizr";

class StoreSaga extends Entity {
    constructor() {
        super('stores', {
            user: new schema.Entity('users'),
            review: [new schema.Entity('reviews')],
            product: [new schema.Entity('products')]
        });
        this.myStoreSaga = this.myStoreSaga.bind(this);
    }
    
    protected * fetchStores() {
        while (true) {
            yield take('STORES_REQUEST');
            yield call(this.readData, 'stores');
        }
    }

    protected * fetchStoreById() {
        while (true) {
            const data = yield take('STORE_BY_ID_REQUEST');
            yield call(this.readData, `store/${data.payload}`);
        }
    }

    public * myStoreSaga() {
        yield all([
            this.fetchStores(),
            this.fetchStoreById()
        ])
    }
}

export default new StoreSaga;