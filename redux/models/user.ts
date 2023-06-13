import Entity from "../../src/models/entity"
import { call, put, take, all } from 'redux-saga/effects'
import { userSaga } from "../../server/constants";
import { loginUserFetchFailed, loginUserFetchSucceeded, registerUserFetchFailed, registerUserFetchSucceeded,
    userByIdFetchFailed, userByIdFetchSucceeded, usersFetchFailed, usersFetchSucceeded } from "../actions/user";

export default class UserSaga extends Entity {
    protected * fetchUsers() {
        while (true) {
            yield take('USERS_REQUEST');
            try {
                const users = yield call(this.readData, 'users')
                yield put(usersFetchSucceeded(users))
            } catch (error) {
                yield put(usersFetchFailed(error.message))
            }
        }
    }

    protected * fetchUserById() {
        while (true) {
            const data = yield take('USER_BY_ID_REQUEST');
            try {
                const user = yield call(this.readData, `user/${data.payload}`)
                yield put(userByIdFetchSucceeded([user]))
            } catch (error) {
                yield put(userByIdFetchFailed(error.message))
            }
        }
    }

    protected * fetchLoginUser() {
        while (true) {
            const data = yield take('LOGIN_USER_REQUEST');
            try {
                const identity = yield call(this.saveData, 'login', data.payload)
                yield put(loginUserFetchSucceeded(identity))
            } catch (error) {
                yield put(loginUserFetchFailed(error.message))
            }
        }
    }

    protected * fetchRegisterUser() {
        while (true) {
            const data = yield take('REGISTER_USER_REQUEST');
            try {
                const identity = yield call(this.saveData, 'register', data.payload)
                yield put(registerUserFetchSucceeded(identity))
            } catch (error) {
                yield put(registerUserFetchFailed(error.message))

            }
        }
    }

    public * myUserSaga() {
        yield all([
            userSaga.fetchUsers(),
            userSaga.fetchUserById(),
            userSaga.fetchLoginUser(),
            userSaga.fetchRegisterUser()
        ])
    }
}