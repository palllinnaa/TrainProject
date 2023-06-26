import { action } from "./action";

export const usersRequest = () => action('USERS_REQUEST');
export const userByIdRequest = (id) => action('USER_BY_ID_REQUEST', id);