import Entity from "../../src/models/entity"
import { call, put, take, all } from 'redux-saga/effects'
import { storeSaga } from "../../server/constants";
import { storeByIdFetchFailed, storeByIdFetchSucceeded, storesFetchFailed, storesFetchSucceeded } from "../actions/store";

export default class StoreSaga extends Entity {
    protected * fetchStores() {
        while (true) {
            yield take('STORES_REQUEST')
            try {
                const stores = yield call(this.readData, 'stores')
                yield put(storesFetchSucceeded(stores))
            } catch (error) {
                yield put(storesFetchFailed(error.message))
            }
        }
    }

    protected * fetchStoreById() {
        while (true) {
            const data = yield take('STORE_BY_ID_REQUEST');
            try {
                const store = yield call(this.readData, `store/${data.payload}`)
                yield put(storeByIdFetchSucceeded([store]))
            } catch (error) {
                yield put(storeByIdFetchFailed(error.message))
            }
        }
    }

    public * myStoreSaga() {
        yield all([
            storeSaga.fetchStores(),
            storeSaga.fetchStoreById(),
        ])
    }
}