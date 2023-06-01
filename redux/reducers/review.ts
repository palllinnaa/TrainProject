const reviewReducer = (state, action) => {
    switch (action.type) {
        case 'RECEIVED_REVIEWS':
            return {
                ...state,
                reviews: action.payload
            };
        case 'RECEIVED_REVIEWS_USERS':
            return {
                ...state,
                reviewsUsers: action.payload
            };
        case 'RECEIVED_REVIEW_BY_ID':
            return {
                ...state,
                review: action.payload
            };
        case 'RECEIVED_REVIEWS_USER_BY_ID':
            return {
                ...state,
                reviewsUser: action.payload
            };
        default:
            return { ...state };
    }
}

export default reviewReducer;
