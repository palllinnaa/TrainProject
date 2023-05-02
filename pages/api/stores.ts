import type { NextApiRequest, NextApiResponse } from 'next'
import { Sequelize } from 'sequelize';
import db from '../../server/db';
import Reviews from '../../server/models/review';
import Stores from '../../server/models/store';
import Users from '../../server/models/user';

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    const result = await Stores.findAll({
        attributes: ['id', 'storeName', 'userId',
            [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
            [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]],
        include: [
            { model: Users, attributes: ['name'] },
            { model: Reviews, attributes: [] },
        ],
        group: ['id']
    });

    // const result = await Stores.findAll({ include: { all: true }});
    const stores = JSON.parse(JSON.stringify(result));
    console.log('result------------------------------------------------------', stores)

    res.status(200).json(stores)
}