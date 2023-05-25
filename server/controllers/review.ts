import { NextApiRequest } from "next";
import { INextApiRequestExtended } from "../interfaces/common";
import BaseController from "./baseController";
import GET from "./decorators/get";

export default class ReviewController extends BaseController {
    @GET("/review/:id")
    public findReviewByIdServerSideProps = async (req: INextApiRequestExtended) => {
        const { ReviewService } = this.di;
        const id = req.params.id;
        const result = await ReviewService.findReviewById(id);
        const review = JSON.parse(JSON.stringify(result));
        return { props: { review } };
    }

    @GET("/api/review/:id")
    public async findReviewById(req: INextApiRequestExtended) {
        const { ReviewService } = this.di;
        const { params } = req;
        const id = parseInt(params.id as string, 10);
        const result = await ReviewService.findReviewById(id);
        const review = JSON.parse(JSON.stringify(result));
        return review;
    }

    @GET("/reviews")
    public findAllReviewsServerSideProps = async () => {
        const { ReviewService } = this.di;
        const result = await ReviewService.findAllReviews();
        const reviews = JSON.parse(JSON.stringify(result));
        return { props: { reviews } };
    }

    @GET("/api/reviews")
    public async findAllReviews() {
        const { ReviewService } = this.di;
        const result = await ReviewService.findAllReviews();
        const reviews = JSON.parse(JSON.stringify(result));
        return reviews;
    }

    @GET("/reviewsUser/:id")
    public findReviewUserOnStoreByIdServerSideProps = async (req: INextApiRequestExtended) => {
        const { ReviewService } = this.di;
        const id = req.params.id;
        const result = await ReviewService.findReviewUserOnStore(id)
        let reviewsUser = JSON.parse(JSON.stringify(result));
        return { props: { reviewsUser } };
    }

    @GET("/api/reviewsUser/:id")
    public async findReviewUserOnStoreById(req: INextApiRequestExtended) {
        const { ReviewService } = this.di;
        const { params } = req;
        const id = parseInt(params.id as string, 10);
        const result = await ReviewService.findReviewUserOnStore(id)
        const reviewsUser = JSON.parse(JSON.stringify(result));
        return reviewsUser;
    }

    @GET("/reviewsUsers")
    public findAllReviewsUsersOnStoresServerSideProps = async (req: NextApiRequest) => {
        const { ReviewService } = this.di;
        const result = await ReviewService.findReviewsUsersOnStores()
        const reviewsUsers = JSON.parse(JSON.stringify(result));
        return { props: { reviewsUsers } };
    }

    @GET("/api/reviewsUsers")
    public async findAllReviewsUsersOnStores() {
        const { ReviewService } = this.di;
        const result = await ReviewService.findReviewsUsersOnStores()
        const reviewsUsers = JSON.parse(JSON.stringify(result));
        return reviewsUsers;
    }
}
