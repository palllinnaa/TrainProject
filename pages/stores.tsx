import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import Stores from "../server/models/store";
import Users from '../server/models/user';
import Reviews from '../server/models/review';
import { Sequelize } from 'sequelize';
import { createRouter } from 'next-connect';

const router = createRouter()
    .get(async (req, res) => {
        const result = await Stores.findAll({
            attributes: ['id', 'storeName', 'userId',
                [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
                [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]],
            include: [
                { model: Users, attributes: ['firstName', 'lastName'] },
                { model: Reviews, attributes: [] },
            ],
            group: ['id']
        });
        const stores = JSON.parse(JSON.stringify(result));
        return { props: { stores } };
    })

export async function getServerSideProps({ req, res }) {
    return router.run(req, res);
}

export default function AllStores(props) {
    const { query } = useRouter();
    const [stores, setStores] = useState(props.stores || []);
    // useEffect(() => {
    //     fetch(`/api/stores`)
    //         .then(res => res.json())
    //         .then(json => {
    //             setStores(json);
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