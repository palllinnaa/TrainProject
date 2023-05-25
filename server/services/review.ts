import BaseContext from "../baseContext";

export default class ReviewService extends BaseContext {
    public async findReviewById(id: number) {
        const { Reviews } = this.di;
        return await Reviews.findByPk(id);
    }

    public async findAllReviews() {
        const { Reviews } = this.di;
        return await Reviews.findAll();
    }

    public async findReviewsUsersOnStores() {
        const { Reviews, Users, Stores } = this.di;
        return await Reviews.findAll({
            include: [
                { model: Users },
                { model: Stores }
            ]
        })
    }

    public async findReviewUserOnStore(id: number) {
        const { Reviews, Users, Stores } = this.di;
        return await Reviews.findAll({
            where: { id },
            include: [
                { model: Users },
                { model: Stores }
            ]
        })
    }
}