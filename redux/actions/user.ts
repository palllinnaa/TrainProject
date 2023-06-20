import { action } from "./action";

export const usersRequest = () => action('USERS_REQUEST');
export const userByIdRequest = (id) => action('USER_BY_ID_REQUEST', id);
export const loginUserRequest = (body) => action('LOGIN_USER_REQUEST', body);
export const registerUserRequest = (body) => action('REGISTER_USER_REQUEST', body);