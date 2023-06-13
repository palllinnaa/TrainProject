import { action } from "./action";

export const usersRequest = () => action('USERS_REQUEST');
export const usersFetchSucceeded = (users) => action('USERS_FETCH_SUCCEEDED', users);
export const usersFetchFailed = (error) => action('USERS_FETCH_FAILED', error);
export const userByIdRequest = (id) => action('USER_BY_ID_REQUEST', id);
export const userByIdFetchSucceeded = (user) => action('USER_BY_ID_FETCH_SUCCEEDED', user);
export const userByIdFetchFailed = (error) => action('USER_BY_ID_FETCH_FAILED', error);
export const loginUserRequest = (body) => action('LOGIN_USER_REQUEST', body);
export const loginUserFetchSucceeded = (identity) => action('LOGIN_USER_FETCH_SUCCEEDED', identity);
export const loginUserFetchFailed = (error) => action('LOGIN_USER_FETCH_FAILED', error);
export const registerUserRequest = (body) => action('REGISTER_USER_REQUEST', body);
export const registerUserFetchSucceeded = (identity) => action('REGISTER_USER_FETCH_SUCCEEDED', identity);
export const registerUserFetchFailed = (error) => action('REGISTER_USER_FETCH_FAILED', error);