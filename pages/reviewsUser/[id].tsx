import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import db from '../../server/db';
import Reviews from '../../server/models/review';
import Stores from '../../server/models/store';
import Users from '../../server/models/user';


// export async function getServerSideProps({ query }) {
//     const id = query.id;
//     const result = await Reviews.findAll({
//         where: { id: id },
//         include: [{
//             model: Users
//         }],
//     })
//     let reviewsUser = JSON.parse(JSON.stringify(result));

//     console.log('SSR, reviewsUser = ', reviewsUser)
//     return {
//         props: {
//             reviewsUser,
//         }
//     }
// }

export async function getServerSideProps({ query }) {
    const id = query.id;
    const result = await Reviews.findAll({
        attributes: ['id', 'reviewText', 'rating'],
        where: { id },
        include: [
            { model: Users, attributes: ['id', 'name', 'email', 'role'] },
            { model: Stores, attributes: ['id', 'storeName', 'userId'] }],
    })
    let reviewsUser = JSON.parse(JSON.stringify(result));

    console.log('SSR, reviewsUser = ', reviewsUser)
    return {
        props: {
            reviewsUser,
        }
    }
}

export default function StorePage(props) {
    const { query } = useRouter();
    const [reviewsUser, setReviewsUser] = useState(props.reviewsUser || []);

    // useEffect(() => {
    //     console.log('fetch the reviewUser = ' + query.id);
    //     fetch(`/api/reviewsUser/` + query.id)
    //         .then(res => res.json())
    //         .then(json => {
    //             setReviewsUser(json);
    //             console.log('client, reviewsUser = ', json)
    //         })
    // }, []);

    return (
        <div>
            <Link href='/reviewsUsers'>Back to reviews users</Link>
            {
                reviewsUser?.map((item) => (
                    <div>
                        <h1 >Id: {item.id}</h1>
                        <p>User id: {item.user.id}</p>
                        {/* <p>Name: {item['user.name']}</p>
                        <p>Email: {item['user.email']}</p>
                        <p>Role: {item['user.role']}</p> */}
                        <p>Name: {item.user.name}</p>
                        <p>Email: {item.user.email}</p>
                        <p>Role: {item.user.role}</p>
                        {/* <p>Name: {item.name}</p>
                        <p>Email: {item.email}</p>
                        <p>Role: {item.role}</p> */}
                        <p>Review Text: {item.reviewText}</p>
                        <p>Rating: {item.rating}</p>
                        <p>Store id: {item.store.id}</p>
                        <p>Store name: {item.store.storeName}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    )

}