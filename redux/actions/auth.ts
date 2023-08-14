import { action } from "./action";

export const getIdentity = (data) => action('GET_IDENTITY', data);
export const identityMessage = (error) => action('MESSAGE_IDENTITY_RESPONSE', error);
export const getIdentityError = (error) => action('GET_IDENTITY_ERROR', error);
export const clearIdentityError = () => action('CLEAR_IDENTITY_ERROR');
export const clearIdentityMessage = () => action('CLEAR_MESSAGE_IDENTITY_RESPONSE');