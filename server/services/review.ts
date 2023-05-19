import BaseContext from "../baseContext";

export default class ReviewService extends BaseContext {
    public findReviewById(reviewId: number) {
        const { Reviews } = this.di;
        return Reviews.findByPk(reviewId, {
            raw: true
        });
    }

    public findAllReviews() {
        const { Reviews } = this.di;
        return Reviews.findAll({
            raw: true
        });
    }

    public findReviewsUsersOnStores() {
        const { Reviews, Users, Stores } = this.di;
        return Reviews.findAll({
            attributes: ['id', 'rating', 'reviewText'],
            include: [
                { model: Users, attributes: ['id', 'firstName', 'lastName', 'email', 'role'] },
                { model: Stores, attributes: ['id', 'storeName', 'userId'] }
            ],
        })
    }

    public findReviewUserOnStore(id: number) {
        const { Reviews, Users, Stores } = this.di;
        return Reviews.findAll({
            attributes: ['id', 'reviewText', 'rating'],
            where: { id },
            include: [
                { model: Users, attributes: ['id', 'firstName', 'lastName', 'email', 'role'] },
                { model: Stores, attributes: ['id', 'storeName', 'userId'] }
            ],
        })
    }
}