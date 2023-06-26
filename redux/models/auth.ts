import { METHODS } from './../../server/constants';
import Entity from "./entity"
import { call, take, put, all } from 'redux-saga/effects'
import { getIdentity, getIdentityError } from "../actions/auth";
import Router from 'next/router'

class AuthSaga extends Entity{
    constructor() {
        super();
        this.myAuthSaga = this.myAuthSaga.bind(this);
    }
    
    protected * fetchLoginUser() {
        while (true) {
            const data = yield take('LOGIN_USER_REQUEST');
            try {
                const result = yield call(this.fetchWrapper, 'login', METHODS.POST, data.payload);
                if (result.identity) {
                    yield put(getIdentity(result.identity));
                    Router.push(`/user/${result.identity.id}`);
                }
            } catch (error) {
                yield put(getIdentityError(error.message));
            }
        }
    }

    protected * fetchRegisterUser() {
        while (true) {
            const data = yield take('REGISTER_USER_REQUEST');
            try {
                const result = yield call(this.fetchWrapper, 'register', METHODS.POST, data.payload);
                if (result.identity) {
                    yield put(getIdentity(result.identity));
                    Router.push(`/user/${result.identity.id}`);
                }
            } catch (error) {
                yield put(getIdentityError(error.message));
            }
        }
    }

    public * myAuthSaga() {
        yield all([
            this.fetchLoginUser(),
            this.fetchRegisterUser()
        ])
    }
}

export default new AuthSaga;