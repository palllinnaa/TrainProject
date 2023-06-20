import Entity from "./entity"
import { call, take, all } from 'redux-saga/effects'
import { userSaga } from "../../server/constants";

export default class UserSaga extends Entity {
    constructor() {
        super('users');
    }

    protected * fetchUsers() {
        while (true) {
            yield take('USERS_REQUEST');
            yield call(this.readData, 'users', this.entityName)
        }
    }

    protected * fetchUserById() {
        while (true) {
            const data = yield take('USER_BY_ID_REQUEST');
            yield call(this.readData, `user/${data.payload}`, this.entityName)
        }
    }

    public * myUserSaga() {
        yield all([
            userSaga.fetchUsers(),
            userSaga.fetchUserById()
        ])
    }
}