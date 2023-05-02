import type { NextApiRequest, NextApiResponse } from 'next'
import { Sequelize } from 'sequelize';
import Reviews from '../../../server/models/review';
import Stores from '../../../server/models/store';
import Users from '../../../server/models/user';



export default async function userHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    const id = parseInt(query.id as string, 10)
    //const result = await Stores.findByPk(id);
    const result = await Stores.findAll({
        where: { id },
        attributes: ['id', 'storeName', 'userId',
            [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
            [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]],
        include: [
            { model: Users, attributes: ['name'] },
            { model: Reviews, attributes: [] },
        ],
        group: ['id']
    });
    const store = JSON.parse(JSON.stringify(result));

    console.log('API, store =', store);
    res.status(200).json(store)

}