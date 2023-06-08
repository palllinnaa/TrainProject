export const productsRequest = () =>({
    type: 'PRODUCTS_REQUEST',
});

export const productsFetchSucceeded = (products) => ({
    type: 'PRODUCTS_FETCH_SUCCEEDED',
    payload: products
});

export const productsFetchFailed = (error) => ({
    type: 'PRODUCTS_FETCH_FAILED',
    payload: error.message
});

export const productByIdRequest = (id) =>({
    type: 'PRODUCT_BY_ID_REQUEST',
    id: id
});

export const productByIdFetchSucceeded = (product) => ({
    type: 'PRODUCT_BY_ID_FETCH_SUCCEEDED',
    payload: product
});

export const productByIdFetchFailed = (error) => ({
    type: 'PRODUCT_BY_ID_FETCH_FAILED',
    payload: error.message
});