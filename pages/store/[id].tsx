import { createRouter } from 'next-connect';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import container from '../../server/container';

const storeController = container.resolve("StoreController");
const router = createRouter()
    .get(storeController.findStoreByIdServerSideProps)

export async function getServerSideProps(context) {
    return router.run({ ...context.req, params: context.params }, context.res);
}

export default function StorePage(props) {
    const { query } = useRouter();
    const [store, setStores] = useState(props.store || []);

    useEffect(() => {
        if (query?.id) {
            fetch(`/api/store/` + query.id)
                .then(res => res.json())
                .then(json => {
                    setStores(json);
                })
        }
    }, [query]);

    return (
        <div>
            <Link href='/stores'>Back to stores</Link>
            {
                store?.map((item) => (
                    <div>
                        <h1>Store {item.id}</h1>
                        <p>Store Name: {item.storeName}</p>
                        <p>Seller id: {item.userId}</p>
                        <p>Seller name: {item.user.firstName} {item.user.lastName}</p>
                        <p>Review count: {item.reviewCount}</p>
                        <p>Rating: {Number(item.rating).toFixed(1)}</p>
                    </div>
                ))
            }
        </div>
    );
}