import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import { createRouter } from 'next-connect';
import container from '../server/container';

const router = createRouter()
    .get(async (req, res) => {
        const result = await container.resolve("ReviewService").findReviewsUsersOnStores()
        const reviewsUsers = JSON.parse(JSON.stringify(result));
        return { props: { reviewsUsers } };
    })

export async function getServerSideProps({ req, res }) {
    return router.run(req, res);
}

export default function reviewsUser(props) {
    const { query } = useRouter();
    const [reviewsUsers, setReviewsUsers] = useState(props.reviewsUsers || []);
    useEffect(() => {
        fetch(`/api/reviewsUsers`)
            .then(res => res.json())
            .then(json => {
                setReviewsUsers(json);
            })
    }, [query]);

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                reviewsUsers?.map((reviewsUser) => (
                    <div>
                        <Link href="/reviewsUser/[id]" as={`/reviewsUser/${reviewsUser.id}`}>Review id: {reviewsUser.id}</Link>
                        <p>User id: {reviewsUser.user.id}</p>
                        <p>Name: {reviewsUser.user.firstName}</p>
                        <p>Surname: {reviewsUser.user.lastName}</p>
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