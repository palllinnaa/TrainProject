import Entity from "./entity"
import { call, take, all } from 'redux-saga/effects'
import { schema } from "normalizr";

export default class ReviewSaga extends Entity {
    constructor() {
        super('reviews', {
            user: new schema.Entity('users'),
            store: new schema.Entity('stores')
        });
        this.myReviewSaga = this.myReviewSaga.bind(this);

    }

    protected * fetchReviews() {
        while (true) {
            yield take('REVIEWS_REQUEST');
            yield call(this.readData, 'reviews')
        }
    }

    protected * fetchReviewById() {
        while (true) {
            const data = yield take('REVIEW_BY_ID_REQUEST');
            yield call(this.readData, `review/${data.payload}`)
        }
    }

    protected * fetchReviewsUsers() {
        while (true) {
            yield take('REVIEWS_USERS_REQUEST');
            yield call(this.readData, 'reviewsUsers')
        }
    }

    protected * fetchReviewsUserById() {
        while (true) {
            const data = yield take('REVIEWS_USER_BY_ID_REQUEST');
            yield call(this.readData, `reviewsUser/${data.payload}`)
        }
    }

    public * myReviewSaga() {
        yield all([
            this.fetchReviews(),
            this.fetchReviewById(),
            this.fetchReviewsUsers(),
            this.fetchReviewsUserById()
        ])
    }
}