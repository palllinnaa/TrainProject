import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import container from '../../server/container';
import Link from 'next/link';

export function getServerSideProps(context){
    return container.resolve("ReviewController").run({...context, routeName: "/review/:id"});
}

export default function ReviewPage(props) {
    const { query } = useRouter();
    const [data, setData] = useState(props.data || []);

    useEffect(() => {
        if (query?.id) {
            fetch(`/api/review/` + query.id)
                .then(res => res.json())
                .then(json => {
                    setData(json);
                })
        }
    }, [query]);

    return (
        <div >
            <Link href='/reviews'>Back to reviews</Link>
            <h1>Review  {data.id}</h1>
            <p>Review text: {data.reviewText}</p>
            <p>Review count: {data.reviewCount}</p>
            <p>Rating: {data.rating}</p>
            <p>User id: {data.userId}</p>
            <p>Store id: {data.storeId}</p>
        </div >
    )
}