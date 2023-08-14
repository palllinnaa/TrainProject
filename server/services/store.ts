import { IPaginationFilter } from './../interfaces/common';
import { Op, Sequelize } from "sequelize";
import BaseServerContext from "../baseServerContext";
import { IResult } from "../interfaces/common";
import { MESSAGE_TYPE } from '../constants';

export default class StoreService extends BaseServerContext {
    public async findStoreById(id: number) {
        const { Stores } = this.di;
        let result: IResult = {};
        result.data = await Stores.findByPk(id);
        result.message = 'Store which id is ' + id + ' was ' + (result.data ? '' : ' not ') + 'found';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_CONSOLE : MESSAGE_TYPE.ERROR_CONSOLE;
        return result;
    }

    public async findAllStores() {
        const { Stores } = this.di;
        let result: IResult = {};
        result.data = await Stores.findAll();
        result.message = 'All stores was ' + (result.data ? '' : ' not ') + 'found';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_TOAST : MESSAGE_TYPE.ERROR_TOAST;
        return result;
    }

    public async countAllStores() {
        const { Stores } = this.di;
        let result: IResult = {};
        result.data = await Stores.count();
        result.message = 'All stores was ' + (result.data ? '' : ' not ') + 'counted';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_CONSOLE : MESSAGE_TYPE.ERROR_CONSOLE;
        return result;
    }

    public async findStoresOwnerReviews() {
        const { Stores, Users, Reviews } = this.di;
        let result: IResult = {};
        result.data = await Stores.findAll({
            attributes: ['id', 'storeName', 'userId',
                [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
                [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]
            ],
            include: [
                { model: Users, attributes: ['id', 'firstName', 'lastName'] },
                { model: Reviews, attributes: [] },
            ],
            group: ['id'],
        });
        result.message = 'All store was ' + (result.data ? '' : ' not ') + 'found';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_TOAST : MESSAGE_TYPE.ERROR_TOAST;
        return result;
    }

    public async findStoresOwnerReviewsPagination(page: number, perPage: number, filter?: IPaginationFilter) {
        let result: IResult = {};
        const offset: number = (page - 1) * perPage;
        const limit: number = perPage;
        result = await this.findStoresWherePagination(offset, limit, filter?.columnName, filter?.columnLabel, filter?.value, filter?.action)
        result.totalCount = await this.countAllStoresPagination(filter?.columnName, filter?.value, filter?.action)
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_TOAST : MESSAGE_TYPE.ERROR_TOAST;
        return result;
    }

    public async findStoresWherePagination(offset: number, limit: number, columnName?: string, columnLabel?: string, value?: string, action?: string) {
        const { Stores, Users, Reviews } = this.di;
        const data = await Stores.findAll({
            attributes: ['id', 'storeName', 'userId',
                [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
                [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]
            ],
            include: [
                { model: Users, attributes: ['id', 'firstName', 'lastName'] },
                { model: Reviews, attributes: [] },
            ],
            group: ['id'],
            where: {
                ...(action === '=' ? {
                    [columnName]: value
                } : action === '<' ? {
                    [columnName]: { [Op.lt]: value }
                } : action === '>' ? {
                    [columnName]: { [Op.gt]: value }
                } : {})
            },
            ...(!value ? {} : value === "downSort" ? {
                order: [[columnName, 'DESC']]
            } : {
                order: [[columnName, 'ASC']]
            }),
            ...(offset ? { offset: offset } : {}),
            ...(limit ? { limit: limit } : {}),
            subQuery: false
        });
        const message = action ?
            'All stores which ' + columnLabel + ' ' + (
                action === '=' ? ' is ' :
                    action === ' < ' ? ' less ' : ' bigger '
            ) + ' ' + value + ' was ' + (data ? '' : 'not') + ' found' :
            value ? 'All stores ' + (
                value === 'downSort' ? 'down sorted' : 'up sorted'
            ) + ' by ' + columnLabel + ' was found' :
                'All stores was ' + (data ? '' : 'not') + ' found';
        return ({ data: data, message: message })
    }

    public async countAllStoresPagination(columnName?: string, value?: string, action?: string) {
        const { Stores } = this.di;
        return await Stores.count({
            ...(action === '=' ? { where: { [columnName]: value } } : {}),
        });
    }

    public async findStoreOwnerReviews(id: number) {
        const { Stores, Users, Reviews } = this.di;
        let result: IResult = {};
        result.data = await Stores.findOne({
            where: { id },
            attributes: ['id', 'storeName', 'userId',
                [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
                [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]],
            include: [
                { model: Users, attributes: ['id', 'firstName', 'lastName'] },
                { model: Reviews, attributes: [] },
            ],
            group: ['id']
        });
        result.message = 'Store which id is ' + id + ' was ' + (result.data ? '' : ' not ') + 'found';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_CONSOLE : MESSAGE_TYPE.ERROR_CONSOLE;
        return result;
    }
}