import { action } from "./action";

export const getIdentity = (data) => action('GET_IDENTITY', data);
export const getIdentityError = (error) => action('GET_IDENTITY_ERROR', error);
export const clearIdentityError = () => action('CLEAR_IDENTITY_ERROR');