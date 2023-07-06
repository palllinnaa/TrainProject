import Entity from "./entity"
import { call } from 'redux-saga/effects'
import { schema } from "normalizr";
import action from "../decorators/action";

export default class ReviewSaga extends Entity {
    constructor(opts: any) {
        super(opts);
        this.initSchema('reviews', {
            user: new schema.Entity('users'),
            store: new schema.Entity('stores')
        });
    }

    @action()
    protected * fetchReviews() {
        yield call(this.readData, 'reviews');
    }

    @action()
    protected * fetchReviewById(data) {
        yield call(this.readData, `review/${data.payload}`);
    }

    @action()
    protected * fetchReviewsUsers() {
        yield call(this.readData, 'reviewsUsers');
    }

    @action()
    protected * fetchReviewsUserById(data) {
        yield call(this.readData, `reviewsUser/${data.payload}`);
    }
}