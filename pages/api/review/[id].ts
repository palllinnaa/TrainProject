import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import container from '../../../server/container';
import { passportInitialize, passportSession } from '../../../server/middleware/passport';

const reviewController = container.resolve("ReviewController");
const router = createRouter<NextApiRequest, NextApiResponse>();
router
    .use(passportInitialize)
    .use(passportSession)
    .get(reviewController.findReviewById)

export default router.handler({
    onError: (err, req, res) => {
        console.error(err);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
});