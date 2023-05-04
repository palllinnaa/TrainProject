import { createRouter } from 'next-connect';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Reviews from '../../server/models/review';
import Stores from '../../server/models/store';
import Users from '../../server/models/user';

const router = createRouter()
    .get("reviewsUser/:id", async (req: any) => {
        const id = req.params.id;
        const result = await Reviews.findAll({
            attributes: ['id', 'reviewText', 'rating'],
            where: { id },
            include: [
                { model: Users, attributes: ['id', 'firstName', 'lastName', 'email', 'role'] },
                { model: Stores, attributes: ['id', 'storeName', 'userId'] }],
        })
        let reviewsUser = JSON.parse(JSON.stringify(result));
        return { props: { reviewsUser } };
    })

export async function getServerSideProps({ req, res }) {
    return router.run(req, res);
}

export default function StorePage(props) {
    const { query } = useRouter();
    const [reviewsUser, setReviewsUser] = useState(props.reviewsUser || []);
    // useEffect(() => {
    //     fetch(`/api/reviewsUser/` + query.id)
    //         .then(res => res.json())
    //         .then(json => {
    //             setReviewsUser(json);
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
                        <p>Name: {item.user.firstName}</p>
                        <p>Surname: {item.user.lastName}</p>
                        <p>Email: {item.user.email}</p>
                        <p>Role: {item.user.role}</p>
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