export const usersRequest = () => ({
    type: 'USERS_REQUEST'
})

export const usersFetchSucceeded = (users) => ({
    type: 'USERS_FETCH_SUCCEEDED',
    payload: users
});

export const usersFetchFailed = (error) => ({
    type: 'USERS_FETCH_FAILED',
    payload: error.message
});

export const userByIdRequest = (id) => ({
    type: 'USER_BY_ID_REQUEST',
    id: id
});

export const userByIdFetchSucceeded = (user) => ({
    type: 'USER_BY_ID_FETCH_SUCCEEDED',
    payload: user
});

export const userByIdFetchFailed = (error) => ({
    type: 'USER_BY_ID_FETCH_FAILED',
    payload: error.message
});

export const loginUserRequest = (body) => ({
    type: 'LOGIN_USER_REQUEST',
    body: body
});

export const loginUserFetchSucceeded = (identity) => ({
    type: 'LOGIN_USER_FETCH_SUCCEEDED',
    payload: identity
});

export const loginUserFetchFailed = (error) => ({
    type: 'LOGIN_USER_FETCH_FAILED',
    payload: error.message
});

export const registerUserRequest = (body) => ({
    type: 'REGISTER_USER_REQUEST',
    body: body
});

export const registerUserFetchSucceeded = (identity) => ({
    type: 'REGISTER_USER_FETCH_SUCCEEDED',
    payload: identity
});

export const registerUserFetchFailed = (error) => ({
    type: 'REGISTER_USER_FETCH_FAILED',
    payload: error.message
});