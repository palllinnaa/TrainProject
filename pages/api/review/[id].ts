import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import Reviews from '../../../server/models/review';

const router = createRouter<NextApiRequest, NextApiResponse>();
router
    .get(async (req, res) => {
        const { query } = req;
        const id = parseInt(query.id as string, 10);
        const result = await Reviews.findByPk(id);
        const review = JSON.parse(JSON.stringify(result));
        res.status(200).json(review)
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