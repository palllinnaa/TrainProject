import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import container from '../../server/container';

const productController = container.resolve("ProductController");
const router = createRouter<NextApiRequest, NextApiResponse>();
router
    .get(productController.findAllProducts)
    
export default router.handler({
    onError: (err, req, res) => {
        console.error(err);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
});