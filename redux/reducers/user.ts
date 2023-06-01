const userReducer = (state, action) => {
    switch (action.type) {
        case 'RECEIVED_USERS':
            return {
                ...state,
                users: action.payload
            };
        case 'RECEIVED_USER_BY_ID':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGIN_USER':
            return {
                ...state,
                identity: action.payload.identity
            };
        case 'REGISTER_USER':
            return {
                ...state,
                identity: action.payload
            };
        default:
            return { ...state };
    }
}

export default userReducer;
