const reviewReducer = (state, action) => {
    switch (action.type) {
        case 'REVIEWS_REQUEST':
        case 'REVIEWS_USERS_REQUEST':
        case 'REVIEW_BY_ID_REQUEST':
        case 'REVIEWS_USER_BY_ID_REQUEST':
            return {
                ...state,
            };
        case 'REVIEWS_FETCH_SUCCEEDED':
        case 'REVIEW_BY_ID_FETCH_SUCCEEDED':
            return {
                ...state,
                reviews: action.payload
            }
        case 'REVIEWS_USERS_FETCH_SUCCEEDED':
        case 'REVIEWS_USER_BY_ID_FETCH_SUCCEEDED':
            return {
                ...state,
                reviewsUsers: action.payload
            }
        case 'REVIEWS_FETCH_FAILED':
        case 'REVIEWS_USERS_FETCH_FAILED':
        case 'REVIEW_BY_ID_FETCH_FAILED':
        case 'REVIEWS_USER_BY_ID_FETCH_FAILED':
            return {
                ...state,
                error: action.payload
            }
        default:
            return { ...state };
    }
}

export default reviewReducer;
