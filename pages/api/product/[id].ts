//import { products } from './../products';
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Product } from '../../../src/interfaces';
import Products from '../../../server/models/product';

// export default function userHandler(
//   req: NextApiRequest,
//   res: NextApiResponse<Product>
// ) {
//     const { query } = req
//     const id = parseInt(query.id as string, 10)
//     const product = products.find(p => p.id == id);
//     console.log('API, product =', product);
//     res.status(200).json(product)
// }

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
    const { query } = req
    const id = parseInt(query.id as string, 10)

    const result = await Products.findByPk(id);

    let product = result.toJSON();
    product = {
         ...product,
      property: product.property.split(";"),
      ingredients: product.ingredients.split(";")
    }
    console.log('API, product =', product);
    res.status(200).json(product)

    //     return {
    //   props: {
    //     data: product
    //   }
    // }
}