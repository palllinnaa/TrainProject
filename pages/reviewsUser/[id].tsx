import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import container from '../../server/container';
import Link from 'next/link';

export function getServerSideProps(context){
    return container.resolve("ReviewController").run({...context, routeName: "/reviewsUser/:id"});
}

export default function StorePage(props) {
    const { query } = useRouter();
    const [data, setData] = useState(props.data || []);

    useEffect(() => {
        if (query?.id) {
            fetch(`/api/reviewsUser/` + query.id)
                .then(res => res.json())
                .then(json => {
                    setData(json);
                })
        }
    }, [query]);

    return (
        <div>
            <Link href='/reviewsUsers'>Back to reviews users</Link>
            {
                data?.map((reviewsUser) => (
                    <div>
                        <h1 >Id: {reviewsUser.id}</h1>
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
    )
}