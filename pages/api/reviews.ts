import type { NextApiRequest, NextApiResponse } from 'next'
import Reviews from '../../server/models/review';

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    const result = await Reviews.findAll();
    const reviews = JSON.parse(JSON.stringify(result));
  
    res.status(200).json(reviews)
}