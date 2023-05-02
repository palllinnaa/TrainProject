import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import db from '../server/db';
import Reviews from '../server/models/review';
import Users from '../server/models/user';
import Review from '../components/products/Review';
import Link from 'next/link';
import Stores from '../server/models/store';
// Reviews.hasMany(Users, {foreignKey : 'userId', as : 'usi'});
// Users.belongsTo(Reviews, {foreignKey : 'id'})

// export async function getServerSideProps() {
//     const res = await db.query(`SELECT * FROM stores JOIN users ON stores.userId=users.id WHERE stores.storeName = 'Emmerich and Sons'`, 
//     const res = await db.query("SELECT * FROM reviews JOIN users ON reviews.userId=users.id JOIN stores ON reviews.storeId=stores.id", 
//     {
//         type: db.QueryTypes.SELECT
//         })


// const res = await db.query("SELECT `reviews`.`id`, `reviews`.`reviewText`, `reviews`.`storeId`, `reviews`.`userId`, `reviews`.`createdAt`, `reviews`.`updatedAt`, `user`.`id` AS `user.id`, `user`.`name` AS `user.name`, `user`.`email` AS `user.email`, `user`.`role` AS `user.role`, `user`.`password` AS `user.password`, `user`.`createdAt` AS `user.createdAt`, `user`.`updatedAt` AS `user.updatedAt` FROM `reviews` AS `reviews` LEFT OUTER JOIN `users` AS `user` ON `reviews`.`userId` = `user`.`id`", {
//     type: db.QueryTypes.SELECT
// })



// const res = await db.query("SELECT `reviews`.`id`, `reviews`.`reviewText`, `reviews`.`reviewCount`, `reviews`.`rating`, `reviews`.`storeId`, `reviews`.`userId`, `reviews`.`createdAt`, `reviews`.`updatedAt`, `user`.`id` AS `user.id`, `user`.`name` AS `user.name`, `user`.`email` AS `user.email`, `user`.`role` AS `user.role`, `user`.`password` AS `user.password`, `user`.`createdAt` AS `user.createdAt`, `user`.`updatedAt` AS `user.updatedAt` , `store`.`id` AS `store.id`, `store`.`storeName` AS `store.storeName`, `store`.`userId` AS `store.userId`, `store`.`createdAt` AS `store.createdAt`, `store`.`updatedAt` AS `store.updatedAt` FROM `reviews` AS `reviews` LEFT OUTER JOIN `users` AS `user` ON `reviews`.`userId` = `user`.`id` LEFT OUTER JOIN `stores` AS `store` ON `reviews`.`storeId` = `store`.`id`", {
//     type: db.QueryTypes.SELECT
// })

//  const res = await db.query("SELECT `reviews`.`id`, `reviews`.`reviewText`, `reviews`.`storeId`, `reviews`.`userId`, `user`.`id` AS `user.id`, `user`.`name` AS `user.name`, `user`.`email` AS `user.email`, `user`.`role` AS `user.role`, `store`.`id` AS `store.id`, `store`.`storeName` AS `store.storeName`, `store`.`userId` AS `store.userId` FROM `reviews` AS `reviews` LEFT OUTER JOIN `users` AS `user` ON `reviews`.`userId` = `user`.`id` LEFT OUTER JOIN `stores` AS `store` ON `reviews`.`storeId` = `store`.`id`", {
//     type: db.QueryTypes.SELECT
// })


// const res = await db.query("SELECT `reviews`.`id`, `reviews`.`reviewText`, `reviews`.`reviewCount`, `reviews`.`rating`, `reviews`.`storeId`, `reviews`.`userId`, `reviews`.`createdAt`, `reviews`.`updatedAt`, `user`.`id` AS `user.id`, `user`.`name` AS `user.name`, `user`.`email` AS `user.email`, `user`.`role` AS `user.role`, `user`.`password` AS `user.password`, `user`.`createdAt` AS `user.createdAt`, `user`.`updatedAt` AS `user.updatedAt` , `store`.`id` AS `store.id`, `store`.`storeName` AS `store.storeName`, `store`.`userId` AS `store.userId`, `store`.`createdAt` AS `store.createdAt`, `store`.`updatedAt` AS `store.updatedAt` FROM `reviews` AS `reviews` LEFT OUTER JOIN `users` AS `user` ON `reviews`.`userId` = `user`.`id` LEFT OUTER JOIN `stores` AS `store` ON `reviews`.`storeId` = `store`.`id` WHERE `reviews`.`id` = `user`.`id`", {
//     type: db.QueryTypes.SELECT
// })

// const res = await Reviews.findAll({
//     include: [{
//         model: Users
//     }],
// })

// const reviewsUsers = JSON.parse(JSON.stringify(res));

// console.log(' ReviewsUsers', reviewsUsers);
// return {
//     props: {
//         reviewsUsers,
//     }
// }
// }


export async function getServerSideProps() {
    const res = await Reviews.findAll({
        attributes: ['id', 'rating', 'reviewText'],
        include: [
            { model: Users, attributes: ['id', 'name', 'email', 'role'] },
            { model: Stores, attributes: ['id', 'storeName', 'userId'] }
        ],
    })
    const reviewsUsers = JSON.parse(JSON.stringify(res));

    console.log(' ReviewsUsers', reviewsUsers);
    return {
        props: {
            reviewsUsers,
        }
    }
}



function reviewsUser(props) {

    const { query } = useRouter();
    const [reviewsUsers, setReviewsUsers] = useState(props.reviewsUsers || []);

    // useEffect(() => {
    //     console.log('fetch the reviewUsers');
    //     fetch(`/api/reviewsUsers`)
    //         .then(res => res.json())
    //         .then(json => {
    //             setReviewsUsers(json);
    //             console.log('reviewsUsers = ', json)
    //         })
    // }, []);

    // const {reviewsUsers} = props;
    return (
        <div>
            <Link href='/'>Home</Link>
            {
                reviewsUsers?.map((reviewsUser) => (
                    <div>
                        <Link href="/reviewsUser/[id]" as={`/reviewsUser/${reviewsUser.id}`}>Review id: {reviewsUser.id}</Link>
                        <p>User id: {reviewsUser.user.id}</p>
                        {/* <p>Name: {reviewsUser['user.name']}</p>
                        <p>Email: {reviewsUser['user.email']}</p>
                        <p>Role: {reviewsUser['user.role']}</p> */}
                        <p>Name: {reviewsUser.user.name}</p>
                        <p>Email: {reviewsUser.user.email}</p>
                        <p>Role: {reviewsUser.user.role}</p>
                        {/* <p>Name: {reviewsUser.name}</p>
                        <p>Email: {reviewsUser.email}</p>
                        <p>Role: {reviewsUser.role}</p> */}
                        <p>Review Text: {reviewsUser.reviewText}</p>
                        <p>Rating: {reviewsUser.rating}</p>
                        <p>Store id: {reviewsUser.store.id}</p>
                        {/* <p>Store name: {reviewsUser['store.storeName']}</p> */}
                        <p>Store name: {reviewsUser.store.storeName}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    );
}

export default reviewsUser;