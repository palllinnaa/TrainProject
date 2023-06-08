export const reviewsRequest = () =>({
    type: 'REVIEWS_REQUEST',
});

export const reviewsFetchSucceeded = (reviews) => ({
    type: 'REVIEWS_FETCH_SUCCEEDED',
    payload: reviews
});

export const reviewsFetchFailed = (error) => ({
    type: 'REVIEWS_FETCH_FAILED',
    payload: error.message
});

export const reviewsUsersRequest = () =>({
    type: 'REVIEWS_USERS_REQUEST',
});

export const reviewsUsersFetchSucceeded = (reviewsUsers) => ({
    type: 'REVIEWS_USERS_FETCH_SUCCEEDED',
    payload: reviewsUsers
});

export const reviewsUsersFetchFailed = (error) => ({
    type: 'REVIEWS_USERS_FETCH_FAILED',
    payload: error.message
});

export const reviewByIdRequest = (id) =>({
    type: 'REVIEW_BY_ID_REQUEST',
    id: id
});

export const reviewByIdFetchSucceeded = (review) => ({
    type: 'REVIEW_BY_ID_FETCH_SUCCEEDED',
    payload: review
});

export const reviewByIdFetchFailed = (error) => ({
    type: 'REVIEW_BY_ID_FETCH_FAILED',
    payload: error.message
});

export const reviewsUserByIdRequest = (id) =>({
    type: 'REVIEWS_USER_BY_ID_REQUEST',
    id: id
});

export const reviewsUserByIdFetchSucceeded = (reviewsUser) => ({
    type: 'REVIEWS_USER_BY_ID_FETCH_SUCCEEDED',
    payload: reviewsUser
});

export const reviewsUserByIdFetchFailed = (error) => ({
    type: 'REVIEWS_USER_BY_ID_FETCH_FAILED',
    payload: error.message
});