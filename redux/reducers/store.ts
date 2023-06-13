const storeReducer = (state, action) => {
    switch (action.type) {
        case 'STORES_REQUEST':
        case 'STORE_BY_ID_REQUEST':
            return {
                ...state,
            };
        case 'STORES_FETCH_SUCCEEDED':
        case 'STORE_BY_ID_FETCH_SUCCEEDED':
            return {
                ...state,
                stores: action.payload
            }
        case 'STORES_FETCH_FAILED':
        case 'STORE_BY_ID_FETCH_FAILED':
            return {
                ...state,
                error: action.payload
            }
        default:
            return { ...state };
    }
}

export default storeReducer;
