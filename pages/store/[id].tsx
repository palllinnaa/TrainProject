import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Sequelize } from 'sequelize';
import Reviews from '../../server/models/review';
import Stores from '../../server/models/store';
import Users from '../../server/models/user';


export async function getServerSideProps({ query }) {
    const id = query.id;
    //const res = await Stores.findByPk(id)

    const res = await Stores.findAll({
        where: { id },
        attributes: ['id', 'storeName', 'userId',
            [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
            [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]],
        include: [
            { model: Users, attributes: ['name'] },
            { model: Reviews, attributes: [] },
        ],
        group: ['id']
    });


    let store = JSON.parse(JSON.stringify(res));

    console.log('SSR, store = ', store)
    return {
        props: {
            store,
        }
    }
}

export default function StorePage(props) {
    const { query } = useRouter();
    const [store, setStores] = useState(props.store || []);

    // useEffect(() => {
    //     console.log('fetch the store = ' + query.id);
    //     fetch(`/api/store/` + query.id)
    //         .then(res => res.json())
    //         .then(json => {
    //             setStores(json);
    //             console.log('client, store = ', json)
    //         })
    // }, []);

    return (
        <div>
            <Link href='/stores'>Back to stores</Link>
            {
                store?.map((item) => (
                    <div>
                        <h1>Store {item.id}</h1>
                        <p>Store Name: {item.storeName}</p>
                        <p>Seller id: {item.userId}</p>
                        <p>Seller name: {item.user.name}</p>
                        <p>Review count: {item.reviewCount}</p>
                        <p>Rating: {Number(item.rating).toFixed(1)}</p>
                    </div>
                ))
            }
        </div>
    );

}