import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import container from '../../server/container';
import Link from 'next/link';

export function getServerSideProps(context) {
    return container.resolve("StoreController").run({...context, routeName: "/store/:id"});
}

export default function StorePage(props) {
    const { query } = useRouter();
    const [data, setData] = useState(props.data || []);

    useEffect(() => {
        if (query?.id) {
            fetch(`/api/store/` + query.id)
                .then(res => res.json())
                .then(json => {
                    setData(json);
                })
        }
    }, [query]);

    return (
        <div>
            <Link href='/stores'>Back to stores</Link>
            {
                data?.map((store) => (
                    <div>
                        <h1>Store {store.id}</h1>
                        <p>Store Name: {store.storeName}</p>
                        <p>Seller id: {store.userId}</p>
                        <p>Seller name: {store.user.firstName} {store.user.lastName}</p>
                        <p>Review count: {store.reviewCount}</p>
                        <p>Rating: {Number(store.rating).toFixed(1)}</p>
                    </div>
                ))
            }
        </div>
    );
}