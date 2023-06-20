import Entity from "./entity"
import { call, take, all } from 'redux-saga/effects'
import { reviewSaga } from "../../server/constants";

export default class ReviewSaga extends Entity {
    constructor() {
        super('reviews');
    }
    
    protected * fetchReviews() {
        while (true) {
            yield take('REVIEWS_REQUEST');
            yield call(this.readData, 'reviews', this.entityName)
        }
    }

    protected * fetchReviewById() {
        while (true) {
            const data = yield take('REVIEW_BY_ID_REQUEST');
            yield call(this.readData, `review/${data.payload}`, this.entityName)
        }
    }

    protected * fetchReviewsUsers() {
        while (true) {
            yield take('REVIEWS_USERS_REQUEST');
            yield call(this.readData, 'reviewsUsers', this.entityName)
        }
    }

    protected * fetchReviewsUserById() {
        while (true) {
            const data = yield take('REVIEWS_USER_BY_ID_REQUEST');
            yield call(this.readData, `reviewsUser/${data.payload}`, this.entityName)
        }
    }

    public * myReviewSaga() {
        yield all([
            reviewSaga.fetchReviews(),
            reviewSaga.fetchReviewById(),
            reviewSaga.fetchReviewsUsers(),
            reviewSaga.fetchReviewsUserById()
        ])
    }
}