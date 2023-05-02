import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../server/db';
import Reviews from '../../server/models/review';
import Stores from '../../server/models/store';
import Users from '../../server/models/user';

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    // const result = await db.query("SELECT * FROM stores JOIN users ON stores.userId=users.id WHERE stores.storeName = 'Emmerich and Sons'", 

    // const result = await db.query("SELECT * FROM reviews JOIN users ON reviews.userId=users.id JOIN stores ON reviews.storeId=stores.id", 
    // {
    //     type: db.QueryTypes.SELECT
    //     })

    //   const result = await db.query("SELECT `reviews`.`id`, `reviews`.`reviewText`, `reviews`.`storeId`, `reviews`.`userId`, `reviews`.`createdAt`, `reviews`.`updatedAt`, `user`.`id` AS `user.id`, `user`.`name` AS `user.name`, `user`.`email` AS `user.email`, `user`.`role` AS `user.role`, `user`.`password` AS `user.password`, `user`.`createdAt` AS `user.createdAt`, `user`.`updatedAt` AS `user.updatedAt` FROM `reviews` AS `reviews` LEFT OUTER JOIN `users` AS `user` ON `reviews`.`userId` = `user`.`id`", {
    //     type: db.QueryTypes.SELECT
    // })


    // const result = await Reviews.findAll({
    //     include: [{
    //         model: Users
    //     }],
    // })


    // const result = await Reviews.findAll({
    //     include: [
    //         { model: Users },
    //         { model: Stores }],
    // })

    const result = await Reviews.findAll({
        attributes:['id', 'reviewText', 'rating'],
        include: [
    { model: Users, attributes: ['id', 'name', 'email', 'role'] },
    { model: Stores, attributes: ['id', 'storeName', 'userId'] }],
    })

    const reviewsUsers = JSON.parse(JSON.stringify(result));

    res.status(200).json(reviewsUsers)
}