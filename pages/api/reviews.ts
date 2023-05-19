import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import container from '../../server/container';
import { passportInitialize, passportSession } from '../../server/middleware/passport';

const router = createRouter<NextApiRequest, NextApiResponse>();
router
    .use(passportInitialize)
    .use(passportSession)
    .get(async (req, res) => {
        const result = await container.resolve("ReviewService").findAllReviews();
        const reviews = JSON.parse(JSON.stringify(result));
        res.status(200).json(reviews)
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