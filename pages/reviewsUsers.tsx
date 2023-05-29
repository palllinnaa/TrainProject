import React, { useEffect, useState } from 'react';
import container from '../server/container';
import Link from 'next/link';

export function getServerSideProps(context) {
    return container.resolve("ReviewController").run(context);
}

export default function reviewsUser(props) {
    const [data, setData] = useState(props.data || []);

    useEffect(() => {
        fetch(`/api/reviewsUsers`)
            .then(res => res.json())
            .then(json => {
                setData(json);
            })
    }, []);

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                data?.map((reviewsUser) => (
                    <div>
                        <Link href={`/reviewsUser/${reviewsUser.id}`}>Review id: {reviewsUser.id}</Link>
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