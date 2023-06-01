export const receivedReviews = (reviews) =>({
    type: 'RECEIVED_REVIEWS',
    payload: reviews
});

export const receivedReviewsUsers = (reviewsUsers) =>({
    type: 'RECEIVED_REVIEWS_USERS',
    payload: reviewsUsers
});

export const receivedReviewById = (review) =>({
    type: 'RECEIVED_REVIEW_BY_ID',
    payload: review
});

export const receivedReviewsUsersById = (reviewsUser) =>({
    type: 'RECEIVED_REVIEWS_USER_BY_ID',
    payload: reviewsUser
});
