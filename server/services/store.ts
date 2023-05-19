import { Sequelize } from "sequelize";
import BaseContext from "../baseContext";

export default class StoreService extends BaseContext {
    public findStoreById(storeId: number) {
        const { Stores } = this.di;
        return Stores.findByPk(storeId, {
            raw: true
        });
    }

    public findAllStores() {
        const { Stores } = this.di;
        return Stores.findAll({
            raw: true
        });
    }

    public findStoresOwnerReviews() {
        const { Stores, Users, Reviews } = this.di;
        return Stores.findAll({
            attributes: ['id', 'storeName', 'userId',
                [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
                [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]],
            include: [
                { model: Users, attributes: ['firstName', 'lastName'] },
                { model: Reviews, attributes: [] },
            ],
            group: ['id'],
        });
    }

    public findStoreOwnerReviews(id: number) {
        const { Stores, Users, Reviews } = this.di;
        return Stores.findAll({
            where: { id },
            attributes: ['id', 'storeName', 'userId',
                [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
                [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]],
            include: [
                { model: Users, attributes: ['firstName', 'lastName'] },
                { model: Reviews, attributes: [] },
            ],
            group: ['id'],
        });
    }
}