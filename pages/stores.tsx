import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import { createRouter } from 'next-connect';
import container from '../server/container';

const router = createRouter()
    .get(async (req, res) => {
        const result = await container.resolve("StoreService").findStoresOwnerReviews()
        const stores = JSON.parse(JSON.stringify(result));
        return { props: { stores } };
    })

export async function getServerSideProps({ req, res }) {
    return router.run(req, res);
}

export default function AllStores(props) {
    const { query } = useRouter();
    const [stores, setStores] = useState(props.stores || []);
    useEffect(() => {
        fetch(`/api/stores`)
            .then(res => res.json())
            .then(json => {
                setStores(json);
            })
    }, [query]);

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                stores?.map((store) => (
                    <div>
                        <Link href="/store/[id]" as={`/store/${store.id}`}>store: {store.id}</Link>
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