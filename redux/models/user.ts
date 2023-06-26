import Entity from "./entity"
import { call, take, all } from 'redux-saga/effects'
import { schema } from "normalizr";

class UserSaga extends Entity {
    constructor() {
        super('users', {
            store: [new schema.Entity('stores')],
            review: [new schema.Entity('reviews')]
        });
        this.myUserSaga = this.myUserSaga.bind(this); 
    }

    protected * fetchUsers() {
        while (true) {
            yield take('USERS_REQUEST');
            yield call(this.readData, 'users');
        }
    }

    protected * fetchUserById() {
        while (true) {
            const data = yield take('USER_BY_ID_REQUEST');
            yield call(this.readData, `user/${data.payload}`);
        }
    }

    public * myUserSaga() {
        yield all([
            this.fetchUsers(),
            this.fetchUserById()
        ])
    }
}

export default new UserSaga();