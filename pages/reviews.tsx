import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import Reviews from "../server/models/review";


export async function getServerSideProps() {
    const res = await Reviews.findAll();
    const reviews = JSON.parse(JSON.stringify(res));

    console.log(' Reviews', reviews);
    return {
        props: {
            reviews,
        }
    }
}


function AllReviews(props) {

    const { query } = useRouter();
    const [reviews, setReviews] = useState(props.reviews || []);

    // useEffect(() => {
    //     console.log('fetch the reviews');
    //     fetch(`/api/reviews`)
    //         .then(res => res.json())
    //         .then(json => {
    //             setReviews(json);
    //             console.log('client reviews = ', json)
    //         })
    // }, []);


    // const { reviews } = props;
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

export default AllReviews;