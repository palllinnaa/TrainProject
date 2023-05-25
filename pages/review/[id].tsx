import { createRouter } from 'next-connect';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import container from '../../server/container';

const reviewController = container.resolve("ReviewController");
const router = createRouter()
    .get(reviewController.findReviewByIdServerSideProps)

export async function getServerSideProps(context) {
    return router.run({ ...context.req, params: context.params }, context.res);
}

export default function ReviewPage(props) {
    const { query } = useRouter();
    const [review, setReview] = useState(props.review || []);

    useEffect(() => {
        if (query?.id) {
            fetch(`/api/review/` + query.id)
                .then(res => res.json())
                .then(json => {
                    setReview(json);
                })
        }
    }, [query]);

    return (
        <div >
            <Link href='/reviews'>Back to reviews</Link>
            <h1>Review  {review.id}</h1>
            <p>Review text: {review.reviewText}</p>
            <p>Review count: {review.reviewCount}</p>
            <p>Rating: {review.rating}</p>
            <p>User id: {review.userId}</p>
            <p>Store id: {review.storeId}</p>
        </div >
    )
}