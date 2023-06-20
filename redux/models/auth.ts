import Entity from "./entity"
import { call, take, all } from 'redux-saga/effects'
import { authSaga } from "../../server/constants";

export default class AuthSaga extends Entity {
    constructor() {
        super('identity');
    }

    protected * fetchLoginUser() {
        while (true) {
            const data = yield take('LOGIN_USER_REQUEST');
            yield call(this.saveData, 'login', data.payload, this.entityName)
        }
    }

    protected * fetchRegisterUser() {
        while (true) {
            const data = yield take('REGISTER_USER_REQUEST');
            yield call(this.saveData, 'register', data.payload, this.entityName)
        }
    }

    public * myAuthSaga() {
        yield all([
            authSaga.fetchLoginUser(),
            authSaga.fetchRegisterUser()
        ])
    }
}