import { action } from "./action";

export const loginUserRequest = (body) => action('LOGIN_USER_REQUEST', body);
export const registerUserRequest = (body) => action('REGISTER_USER_REQUEST', body);
export const getIdentity = (data) => action('GET_IDENTITY', data);
export const getIdentityError = (error) => action('GET_IDENTITY_ERROR', error);
export const clearIdentityError = () => action('CLEAR_IDENTITY_ERROR');