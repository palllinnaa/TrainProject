export const receivedUsers = (users) =>({
    type: 'RECEIVED_USERS',
    payload: users
});

export const receivedUserById = (user) =>({
    type: 'RECEIVED_USER_BY_ID',
    payload: user
});

export const loginUser = (user) =>({
    type: 'LOGIN_USER',
    payload: user
});

export const registerUser = (user) =>({
    type: 'REGISTER_USER',
    payload: user
});
