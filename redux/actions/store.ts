export const receivedStores = (stores) =>({
    type: 'RECEIVED_STORES',
    payload: stores
});

export const receivedStoreById = (store) =>({
    type: 'RECEIVED_STORE_BY_ID',
    payload: store
});
