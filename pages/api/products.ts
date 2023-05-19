import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import container from '../../server/container';

const router = createRouter<NextApiRequest, NextApiResponse>();
router
    .get(async (req, res) => {
        const result = await container.resolve("ProductService").findAllProducts()
        const data = JSON.parse(JSON.stringify(result));
        const products = data.map((item) => ({
            ...item,
            property: item.property.split(';'),
        }));
        res.status(200).json(products)
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