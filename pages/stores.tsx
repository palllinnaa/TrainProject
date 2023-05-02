import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import Stores from "../server/models/store";
import Users from '../server/models/user';
import Reviews from '../server/models/review';
import { Sequelize } from 'sequelize';

export async function getServerSideProps() {
    const res = await Stores.findAll({
        attributes: ['id', 'storeName', 'userId',
            [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
            [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]],
        include: [
            { model: Users, attributes: ['name'] },
            { model: Reviews, attributes: [] },
        ],
        group: ['id']
    });
    const stores = JSON.parse(JSON.stringify(res));

    console.log(' Stores', stores);
    return {
        props: {
            stores,
        }
    }
}


function AllStores(props) {

    const { query } = useRouter();
    const [stores, setStores] = useState(props.stores || []);

    // useEffect(() => {
    //     console.log('fetch the stores');
    //     fetch(`/api/stores`)
    //         .then(res => res.json())
    //         .then(json => {
    //             setStores(json);
    //             console.log('client stores = ', json)
    //         })
    // }, []);

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                stores?.map((store) => (
                    <div>
                        <Link href="/store/[id]" as={`/store/${store.id}`}>store: {store.id}</Link>
                        <p>Store Name: {store.storeName}</p>
                        <p>Seller id: {store.userId}</p>
                        <p>Seller name: {store.user.name}</p>
                        <p>Review count: {store.reviewCount}</p>
                        <p>Rating: {Number(store.rating).toFixed(1)}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    );
}

export default AllStores;