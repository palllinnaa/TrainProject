import Entity from "../../src/models/entity"
import { call, put, take, all } from 'redux-saga/effects'
import { reviewSaga } from "../../server/constants";
import { reviewsFetchFailed, reviewsFetchSucceeded, reviewByIdFetchSucceeded, reviewByIdFetchFailed,
    reviewsUsersFetchSucceeded, reviewsUsersFetchFailed, reviewsUserByIdFetchSucceeded, reviewsUserByIdFetchFailed } from '../actions/review';

export default class ReviewSaga extends Entity {
    protected * fetchReviews() {
        while (true) {
            yield take('REVIEWS_REQUEST');
            try {
                const reviews = yield call(this.readData, 'reviews')
                yield put(reviewsFetchSucceeded(reviews))
            } catch (error) {
                yield put(reviewsFetchFailed(error.message))
            }
        }
    }

    protected * fetchReviewById() {
        while (true) {
            const data = yield take('REVIEW_BY_ID_REQUEST');
            try {
                const review = yield call(this.readData, `review/${data.payload}`)
                yield put(reviewByIdFetchSucceeded([review]))
            } catch (error) {
                yield put(reviewByIdFetchFailed(error.message))
            }
        }
    }

    protected * fetchReviewsUsers() {
        while (true) {
            yield take('REVIEWS_USERS_REQUEST');
            try {
                const reviewsUsers = yield call(this.readData, 'reviewsUsers')
                yield put(reviewsUsersFetchSucceeded(reviewsUsers))
            } catch (error) {
                yield put(reviewsUsersFetchFailed(error.message))
            }
        }
    }

    protected * fetchReviewsUserById() {
        while (true) {
            const data = yield take('REVIEWS_USER_BY_ID_REQUEST');
            try {
                const reviewsUser = yield call(this.readData, `reviewsUser/${data.payload}`)
                yield put(reviewsUserByIdFetchSucceeded([reviewsUser]))
            } catch (error) {
                yield put(reviewsUserByIdFetchFailed(error.message))
            }
        }
    }

    public * myReviewSaga() {
        yield all([
            reviewSaga.fetchReviews(),
            reviewSaga.fetchReviewById(),
            reviewSaga.fetchReviewsUsers(),
            reviewSaga.fetchReviewsUserById(),
        ])
    }
}