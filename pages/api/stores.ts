import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import { Sequelize } from 'sequelize';
import db from '../../server/db';
import Reviews from '../../server/models/review';
import Stores from '../../server/models/store';
import Users from '../../server/models/user';

// export default async function handler(
//     _req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const result = await Stores.findAll({
//         attributes: ['id', 'storeName', 'userId',
//             [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
//             [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]],
//         include: [
//             { model: Users, attributes: ['name'] },
//             { model: Reviews, attributes: [] },
//         ],
//         group: ['id']
//     });

//     // const result = await Stores.findAll({ include: { all: true }});
//     const stores = JSON.parse(JSON.stringify(result));
//     console.log('result------------------------------------------------------', stores)

//     res.status(200).json(stores)
// }


const router = createRouter<NextApiRequest, NextApiResponse>();

router
    .get(async (req, res) => {
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

        const stores = JSON.parse(JSON.stringify(result));
        res.status(200).json(stores)
    })

export default router.handler({
    onError: (err, req, res) => {
        console.error(err);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
});