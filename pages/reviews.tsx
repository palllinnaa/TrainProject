import React, { useEffect, useState } from 'react';
import container from '../server/container';
import Link from "next/link";

export function getServerSideProps(context) {
    return container.resolve("ReviewController").run(context);
}

export default function AllReviews(props) {
    const [data, setData] = useState(props.data || []);

    useEffect(() => {
        fetch(`/api/reviews`)
            .then(res => res.json())
            .then(json => {
                setData(json);
            })
    }, []);

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                data?.map((review) => (
                    <div>
                        <Link href={`/review/${review.id}`}>Review {review.id}</Link>
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