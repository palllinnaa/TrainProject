import type { NextApiRequest, NextApiResponse } from 'next'
import Reviews from '../../../server/models/review';



export default async function userHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    const id = parseInt(query.id as string, 10)
    const result = await Reviews.findByPk(id);
    const review = result.toJSON();

    console.log('API, review =', review);
    res.status(200).json(review)

}