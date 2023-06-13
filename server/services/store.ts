import { Sequelize } from "sequelize";
import BaseContext from "../baseContext";

export default class StoreService extends BaseContext {
    public async findStoreById(id: number) {
        const { Stores } = this.di;
        return await Stores.findByPk(id);
    }

    public async findAllStores() {
        const { Stores } = this.di;
        return await Stores.findAll();
    }

    public async findStoresOwnerReviews() {
        const { Stores, Users, Reviews } = this.di;
        return await Stores.findAll({
            attributes: ['id', 'storeName', 'userId',
                [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
                [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]],
            include: [
                { model: Users, attributes: ['firstName', 'lastName'] },
                { model: Reviews, attributes: [] },
            ],
            group: ['id']

        });
    }

    public async findStoreOwnerReviews(id: number) {
        const { Stores, Users, Reviews } = this.di;
        return await Stores.findOne({
            where: { id },
            attributes: ['id', 'storeName', 'userId',
                [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
                [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]],
            include: [
                { model: Users, attributes: ['firstName', 'lastName'] },
                { model: Reviews, attributes: [] },
            ],
            group: ['id']
        });
    }
}