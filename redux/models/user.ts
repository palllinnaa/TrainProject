import { IPaginationParams } from './../../server/interfaces/common';
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
    protected * fetchUsers(params) {
        yield call(this.readData, `users`, params.payload, { page: params.payload.page, limit: params.payload.perPage});

    }

    @action()
    protected * fetchUserById(data) {
        yield call(this.readData, `user/${data.payload}`);
    }
}