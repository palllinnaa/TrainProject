import { action } from "./action";

export const productsRequest = () => action('PRODUCTS_REQUEST');
export const productsFetchSucceeded = (products) => action('PRODUCTS_FETCH_SUCCEEDED', products);
export const productsFetchFailed = (error) => action('PRODUCTS_FETCH_FAILED', error);
export const productByIdRequest = (id) => action('PRODUCT_BY_ID_REQUEST', id);
export const productByIdFetchSucceeded = (product) => action('PRODUCT_BY_ID_FETCH_SUCCEEDED', product);
export const productByIdFetchFailed = (error) => action('PRODUCT_BY_ID_FETCH_FAILED', error);