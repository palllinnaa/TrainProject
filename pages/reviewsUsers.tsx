import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Reviews from '../server/models/review';
import Users from '../server/models/user';
import Link from 'next/link';
import Stores from '../server/models/store';
import { createRouter } from 'next-connect';

const router = createRouter()
    .get(async (req, res) => {
        const result = await Reviews.findAll({
            attributes: ['id', 'rating', 'reviewText'],
            include: [
                { model: Users, attributes: ['id', 'name', 'email', 'role'] },
                { model: Stores, attributes: ['id', 'storeName', 'userId'] }
            ],
        })
        const reviewsUsers = JSON.parse(JSON.stringify(result));
        return { props: { reviewsUsers } };
    })

export async function getServerSideProps({ req, res }) {
    return router.run(req, res);
}

export default function reviewsUser(props) {
    const { query } = useRouter();
    const [reviewsUsers, setReviewsUsers] = useState(props.reviewsUsers || []);
    // useEffect(() => {
    //     fetch(`/api/reviewsUsers`)
    //         .then(res => res.json())
    //         .then(json => {
    //             setReviewsUsers(json);
    //         })
    // }, []);

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                reviewsUsers?.map((reviewsUser) => (
                    <div>
                        <Link href="/reviewsUser/[id]" as={`/reviewsUser/${reviewsUser.id}`}>Review id: {reviewsUser.id}</Link>
                        <p>User id: {reviewsUser.user.id}</p>
                        <p>Name: {reviewsUser.user.name}</p>
                        <p>Email: {reviewsUser.user.email}</p>
                        <p>Role: {reviewsUser.user.role}</p>
                        <p>Review Text: {reviewsUser.reviewText}</p>
                        <p>Rating: {reviewsUser.rating}</p>
                        <p>Store id: {reviewsUser.store.id}</p>
                        <p>Store name: {reviewsUser.store.storeName}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    );
}