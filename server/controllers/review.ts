import BaseController from "./baseController";
import { INextApiRequestExtended } from "../interfaces/common";
import GET from "../decorators/get";
import SSR from "../decorators/ssr";

export default class ReviewController extends BaseController {
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
