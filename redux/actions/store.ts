import { action } from "./action";

export const storesRequest = () => action('STORES_REQUEST');
export const storesFetchSucceeded = (stores) => action('STORES_FETCH_SUCCEEDED', stores);
export const storesFetchFailed = (error) => action('STORES_FETCH_FAILED', error);
export const storeByIdRequest = (id) => action('STORE_BY_ID_REQUEST', id);
export const storeByIdFetchSucceeded = (store) => action('STORE_BY_ID_FETCH_SUCCEEDED', store);
export const storeByIdFetchFailed = (error) => action('STORE_BY_ID_FETCH_FAILED', error);