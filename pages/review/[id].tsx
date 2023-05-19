import { createRouter } from 'next-connect';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import container from '../../server/container';

const router = createRouter()
    .get("review/:id", async (req: any) => {
        const id = req.params.id;
        const result = await container.resolve("ReviewService").findReviewById(id);
        const review = JSON.parse(JSON.stringify(result));
        return { props: { review } };
    })
    .all(() => {
        console.log("----------------------------------------------all----------------------------------------------")
        return { props: {} };
    });

export async function getServerSideProps({ req, res }) {
    return router.run(req, res);
}

export default function ReviewPage(props) {
    const { query } = useRouter();
    const [review, setReview] = useState(props.review || []);
    useEffect(() => {
        fetch(`/api/review/` + query.id)
            .then(res => res.json())
            .then(json => {
                setReview(json);
            })
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