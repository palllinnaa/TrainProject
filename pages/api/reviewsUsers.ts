import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import Reviews from '../../server/models/review';
import Stores from '../../server/models/store';
import Users from '../../server/models/user';

const router = createRouter<NextApiRequest, NextApiResponse>();
router
    .get(async (req, res) => {
        const result = await Reviews.findAll({
            attributes: ['id', 'reviewText', 'rating'],
            include: [
                { model: Users, attributes: ['id', 'firstName', 'lastName', 'email', 'role'] },
                { model: Stores, attributes: ['id', 'storeName', 'userId'] }],
        })
        const reviewsUsers = JSON.parse(JSON.stringify(result));
        res.status(200).json(reviewsUsers)
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