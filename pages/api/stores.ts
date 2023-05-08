import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import { Sequelize } from 'sequelize';
import { passportInitialize, passportSession } from '../../server/middleware/passport';
import Reviews from '../../server/models/review';
import Stores from '../../server/models/store';
import Users from '../../server/models/user';

const router = createRouter<NextApiRequest, NextApiResponse>();
router
    .use(passportInitialize)
    .use(passportSession)
    .get(async (req, res) => {
        const result = await Stores.findAll({
            attributes: ['id', 'storeName', 'userId',
                [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
                [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]],
            include: [
                { model: Users, attributes: ['firstName', 'lastName'] },
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