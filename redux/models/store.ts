import Entity from "./entity"
import { call, take, all } from 'redux-saga/effects'
import { storeSaga } from "../../server/constants";
export default class StoreSaga extends Entity {
    constructor() {
        super('stores');
    }
    
    protected * fetchStores() {
        while (true) {
            yield take('STORES_REQUEST')
            yield call(this.readData, 'stores', this.entityName)
        }
    }

    protected * fetchStoreById() {
        while (true) {
            const data = yield take('STORE_BY_ID_REQUEST');
            yield call(this.readData, `store/${data.payload}`, this.entityName)
        }
    }

    public * myStoreSaga() {
        yield all([
            storeSaga.fetchStores(),
            storeSaga.fetchStoreById()
        ])
    }
}