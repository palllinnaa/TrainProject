const productReducer = (state, action) => {
    switch (action.type) {
        case 'RECEIVED_PRODUCTS':
            return {
                ...state,
                products: action.payload
            };
        case 'RECEIVED_PRODUCT_BY_ID':
            return {
                ...state,
                product: action.payload
            };
        default:
            return { ...state };
    }
}

export default productReducer;
