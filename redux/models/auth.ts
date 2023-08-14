import { METHODS } from './../../server/constants';
import Entity from "./entity"
import { call, put } from 'redux-saga/effects'
import { clearIdentityMessage, getIdentity, getIdentityError, identityMessage } from "../actions/auth";
import Router from 'next/router'
import action from '../decorators/action';

export default class AuthSaga extends Entity {
    constructor(opts: any) {
        super(opts);
        this.initSchema();
    }

    @action()
    protected * fetchLoginUser(data) {
        try {
            const result = yield call(this.fetchWrapper, 'login', METHODS.POST, data.payload);
            if (result.data) {
                yield put(getIdentity(result.data));
                const { message, messageType } = result;
                yield put(identityMessage({ message: { message, messageType } }));
                Router.push(`/user/${result.data.id}`);
            }
        } catch (error) {
            yield put(getIdentityError(error.message));
        }
    }

    @action()
    protected * fetchRegisterUser(data) {
        try {
            const result = yield call(this.fetchWrapper, 'register', METHODS.POST, data.payload);
            if (result.data) {
                yield put(getIdentity(result.data));
                const { message, messageType } = result;
                yield put(identityMessage({ message: { message, messageType } }));
                Router.push(`/user/${result.data.id}`);
            }
        } catch (error) {
            yield put(getIdentityError(error.message));
        }
    }
}