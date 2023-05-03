import type { NextApiRequest, NextApiResponse } from 'next'
import Products from '../../../server/models/product';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();
router
    .get(async (req, res) => {
        const { query } = req;
        const id = parseInt(query.id as string, 10);
        const result = await Products.findByPk(id);
        let product = result.toJSON();
        product = {
            ...product,
            property: product.property.split(";"),
            ingredients: product.ingredients.split(";")
        }
        res.status(200).json(product)
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