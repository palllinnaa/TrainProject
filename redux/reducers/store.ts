const storeReducer = (state, action) => {
    switch (action.type) {
        case 'RECEIVED_STORES':
            return {
                ...state,
                stores: action.payload
            };
        case 'RECEIVED_STORE_BY_ID':
            return {
                ...state,
                store: action.payload
            };
        default:
            return { ...state };
    }
}

export default storeReducer;
