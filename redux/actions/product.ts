export const receivedProducts = (products) =>({
    type: 'RECEIVED_PRODUCTS',
    payload: products
});

export const receivedProductById = (product) =>({
    type: 'RECEIVED_PRODUCT_BY_ID',
    payload: product
});
