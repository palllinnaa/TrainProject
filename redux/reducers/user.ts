const userReducer = (state, action) => {
    switch (action.type) {
        case 'USERS_REQUEST':
        case 'USER_BY_ID_REQUEST':
        case 'LOGIN_USER_REQUEST':
        case 'REGISTER_USER_REQUEST':
            return {
                ...state,
            }
        case 'USERS_FETCH_SUCCEEDED':
        case 'USER_BY_ID_FETCH_SUCCEEDED':
            return {
                ...state,
                users: action.payload
            }
        case 'LOGIN_USER_FETCH_SUCCEEDED':
            return {
                ...state,
                identity: action.payload.identity
            }
        case 'REGISTER_USER_FETCH_SUCCEEDED':
            return {
                ...state,
                identity: action.payload
            }
        case 'USERS_FETCH_FAILED':
        case 'USER_BY_ID_FETCH_FAILED':
        case 'LOGIN_USER_FETCH_FAILED':
        case 'REGISTER_USER_FETCH_FAILED':
            return {
                ...state,
                error: action.payload
            }
        default:
            return { ...state };
    }
}

export default userReducer;
