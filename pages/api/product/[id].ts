import { products } from './../products';
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Product } from '../../../src/interfaces';

export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
    const { query } = req
    const id = parseInt(query.id as string, 10)
    const product = products.find(p => p.id == id);
    console.log('API, product =', product);
    res.status(200).json(product)
}