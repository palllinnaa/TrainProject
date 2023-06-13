const productReducer = (state, action) => {
    switch (action.type) {
        case 'PRODUCTS_REQUEST':
        case 'PRODUCT_BY_ID_REQUEST':
            return {
                ...state,
            }
        case 'PRODUCTS_FETCH_SUCCEEDED':
        case 'PRODUCT_BY_ID_FETCH_SUCCEEDED':
            return {
                ...state,
                products: action.payload
            }
        case 'PRODUCTS_FETCH_FAILED':
        case 'PRODUCT_BY_ID_FETCH_FAILED':
            return {
                ...state,
                error: action.payload
            }
        default:
            return { ...state };
    }
}

export default productReducer;
