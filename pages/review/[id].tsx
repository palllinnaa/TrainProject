import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Reviews from '../../server/models/review';


export async function getServerSideProps({ query }) {
    const id = query.id;
    const res = await Reviews.findByPk(id)
    let review = JSON.parse(JSON.stringify(res));

    console.log('SSR, review = ', review)
    return {
        props: {
            review,
        }
    }
}

export default function ReviewPage(props) {
    const { query } = useRouter();
    const [review, setReview] = useState(props.review || []);

    useEffect(() => {
        console.log('fetch the review = ' + query.id);
        fetch(`/api/review/` + query.id)
            .then(res => res.json())
            .then(json => {
                setReview(json);
                console.log('client, review = ', json)
            })
    }, []);

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