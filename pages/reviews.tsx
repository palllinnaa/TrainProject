import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import Reviews from "../server/models/review";
import { createRouter } from 'next-connect';

const router = createRouter()
    .get(async (req, res) => {
        const result = await Reviews.findAll();
        const reviews = JSON.parse(JSON.stringify(result));
        return { props: { reviews } };
    })

export async function getServerSideProps({ req, res }) {
    return router.run(req, res);
}

export default function AllReviews(props) {
    const { query } = useRouter();
    const [reviews, setReviews] = useState(props.reviews || []);
    // useEffect(() => {
    //     fetch(`/api/reviews`)
    //         .then(res => res.json())
    //         .then(json => {
    //             setReviews(json);
    //         })
    // }, []);

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                reviews?.map((review) => (
                    <div>
                        <Link href="/review/[id]" as={`/review/${review.id}`}>Review {review.id}</Link>
                        <p>Review text: {review.reviewText}</p>
                        <p>Review count: {review.reviewCount}</p>
                        <p>Rating: {review.rating}</p>
                        <p>User id: {review.userId}</p>
                        <p>Store id: {review.storeId}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    );
}