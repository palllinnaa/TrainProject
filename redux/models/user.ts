import Entity from "./entity"
import { call } from 'redux-saga/effects'
import { schema } from "normalizr";
import action from "../decorators/action";

export default class UserSaga extends Entity {
    constructor(opts: any) {
        super(opts);
        this.initSchema('users', {
            store: [new schema.Entity('stores')],
            review: [new schema.Entity('reviews')]
        });
    }

    @action()
    protected * fetchUsers() {
        yield call(this.readData, 'users');
    }

    @action()
    protected * fetchUserById(data) {
        yield call(this.readData, `user/${data.payload}`);
    }
}