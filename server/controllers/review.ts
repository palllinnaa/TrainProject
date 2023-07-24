import BaseController from "./baseController";
import { INextApiRequestExtended } from "../interfaces/common";
import GET from "../decorators/get";
import SSR from "../decorators/ssr";
import USE from "../decorators/use";
import session from "../middleware/session";
import { passportInitialize, passportSession } from "../middleware/passport";
import { schema } from "normalizr";

@USE([session, passportInitialize, passportSession])
export default class ReviewController extends BaseController {
    constructor(opts: any) {
        super(opts);
        this.initSchema('reviews', {
            user: new schema.Entity('users'),
            store: new schema.Entity('stores')
        });
    }

    @SSR("/review/:id")
    @GET("/api/review/:id")
    public async findReviewById(req: INextApiRequestExtended) {
        const { ReviewService } = this.di;
        const { params } = req;
        const id = parseInt(params.id as string, 10);
        return await ReviewService.findReviewById(id);
    }

    @SSR("/reviews")
    @GET("/api/reviews")
    public async findAllReviews() {
        const { ReviewService } = this.di;
        return await ReviewService.findAllReviews();
    }

    @SSR("/reviewsUser/:id")
    @GET("/api/reviewsUser/:id")
    public async findReviewUserOnStoreById(req: INextApiRequestExtended) {
        const { ReviewService } = this.di;
        const { params } = req;
        const id = parseInt(params.id as string, 10);
        return await ReviewService.findReviewUserOnStore(id);
    }

    @SSR("/reviewsUsers")
    @GET("/api/reviewsUsers")
    public async findAllReviewsUsersOnStores() {
        const { ReviewService } = this.di;
        return await ReviewService.findReviewsUsersOnStores();
    }
}
