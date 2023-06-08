export const storesRequest = () =>({
    type: 'STORES_REQUEST'
});

export const storesFetchSucceeded = (stores) => ({
    type: 'STORES_FETCH_SUCCEEDED',
    payload: stores
});

export const storesFetchFailed = (error) => ({
    type: 'STORES_FETCH_FAILED',
    payload: error.message
});

export const storeByIdRequest = (id) =>({
    type: 'STORE_BY_ID_REQUEST',
    id: id
});

export const storeByIdFetchSucceeded = (store) => ({
    type: 'STORE_BY_ID_FETCH_SUCCEEDED',
    payload: store
});

export const storeByIdFetchFailed = (error) => ({
    type: 'STORE_BY_ID_FETCH_FAILED',
    payload: error.message
});