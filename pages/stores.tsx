import React, { useEffect, useState } from 'react';
import container from '../server/container';
import Link from "next/link";

export function getServerSideProps(context) {
    return container.resolve("StoreController").run(context);
}

export default function AllStores(props) {
    const [data, setData] = useState(props.data || []);

    useEffect(() => {
        fetch(`/api/stores`)
            .then(res => res.json())
            .then(json => {
                setData(json);
            })
    }, []);

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                data?.map((store) => (
                    <div>
                        <Link href={`/store/${store.id}`}>store: {store.id}</Link>
                        <p>Store Name: {store.storeName}</p>
                        <p>Seller id: {store.userId}</p>
                        <p>Seller name: {store.user.firstName} {store.user.lastName}</p>
                        <p>Review count: {store.reviewCount}</p>
                        <p>Rating: {Number(store.rating).toFixed(1)}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    );
}