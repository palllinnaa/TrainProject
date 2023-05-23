import { NextApiRequest, NextApiResponse } from "next";
import BaseContext from "../baseContext";
import { INextApiRequestExtended } from "../interfaces/common";

export default class ReviewController extends BaseContext {
    public findReviewByIdServerSideProps = async (req: INextApiRequestExtended) => {
        const { ReviewService } = this.di;
        const id = req.params.id;
        const result = await ReviewService.findReviewById(id);
        const review = JSON.parse(JSON.stringify(result));
        return { props: { review } };
    }

    public findReviewById = async (req: NextApiRequest, res: NextApiResponse) => {
        const { ReviewService } = this.di;
        const { query } = req;
        const id = parseInt(query.id as string, 10);
        const result = await ReviewService.findReviewById(id);
        const review = JSON.parse(JSON.stringify(result));
        res.status(200).json(review)
    }

    public findAllReviewsServerSideProps = async () => {
        const { ReviewService } = this.di;
        const result = await ReviewService.findAllReviews();
        const reviews = JSON.parse(JSON.stringify(result));
        return { props: { reviews } };
    }

    public findAllReviews = async (req: NextApiRequest, res: NextApiResponse) => {
        const { ReviewService } = this.di;
        const result = await ReviewService.findAllReviews();
        const reviews = JSON.parse(JSON.stringify(result));
        res.status(200).json(reviews)
    }

    public findReviewUserOnStoreByIdServerSideProps = async (req: INextApiRequestExtended) => {
        const { ReviewService } = this.di;
        const id = req.params.id;
        const result = await ReviewService.findReviewUserOnStore(id)
        let reviewsUser = JSON.parse(JSON.stringify(result));
        return { props: { reviewsUser } };
    }

    public findReviewUserOnStoreById = async (req: NextApiRequest, res: NextApiResponse) => {
        const { ReviewService } = this.di;
        const { query } = req;
        const id = parseInt(query.id as string, 10);
        const result = await ReviewService.findReviewUserOnStore(id)
        const reviewsUser = JSON.parse(JSON.stringify(result));
        res.status(200).json(reviewsUser)
    }

    public findAllReviewsUsersOnStoresServerSideProps = async (req: NextApiRequest) => {
        const { ReviewService } = this.di;
        const result = await ReviewService.findReviewsUsersOnStores()
        const reviewsUsers = JSON.parse(JSON.stringify(result));
        return { props: { reviewsUsers } };
    }

    public findAllReviewsUsersOnStores = async (req: NextApiRequest, res: NextApiResponse) => {
        const { ReviewService } = this.di;
        const result = await ReviewService.findReviewsUsersOnStores()
        const reviewsUsers = JSON.parse(JSON.stringify(result));
        res.status(200).json(reviewsUsers)
    }
}
