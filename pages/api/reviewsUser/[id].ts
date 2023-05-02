import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../server/db';
import Reviews from '../../../server/models/review';
import Stores from '../../../server/models/store';
import Users from '../../../server/models/user';



export default async function userHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    const id = parseInt(query.id as string, 10)
    // const result = await Reviews.findAll({
    //     where: { id: id },
    //     include: [
    //         { model: Users }],
    // })

    const result = await Reviews.findAll({
        attributes: ['id', 'reviewText', 'rating'],
        where: { id: id },
        include: [
            { model: Users, attributes: ['id', 'name', 'email', 'role'] },
            { model: Stores, attributes: ['id', 'storeName', 'userId'] }],
    })
    const reviewsUser = JSON.parse(JSON.stringify(result));

    console.log('API, reviewsUser =', reviewsUser);
    res.status(200).json(reviewsUser)

}