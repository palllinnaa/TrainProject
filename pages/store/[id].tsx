import { createRouter } from 'next-connect';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Sequelize } from 'sequelize';
import Reviews from '../../server/models/review';
import Stores from '../../server/models/store';
import Users from '../../server/models/user';

const router = createRouter()
    .get("store/:id", async (req: any) => {
        const id = req.params.id;
        const result = await Stores.findAll({
            where: { id },
            attributes: ['id', 'storeName', 'userId',
                [Sequelize.fn("COUNT", Sequelize.col("reviews.storeId")), "reviewCount"],
                [Sequelize.fn("avg", Sequelize.col("reviews.rating")), "rating"]],
            include: [
                { model: Users, attributes: ['firstName', 'lastName'] },
                { model: Reviews, attributes: [] },
            ],
            group: ['id']
        });
        const store = JSON.parse(JSON.stringify(result));
        return { props: { store } };
    })

export async function getServerSideProps({ req, res }) {
    return router.run(req, res);
}

export default function StorePage(props) {
    const { query } = useRouter();
    const [store, setStores] = useState(props.store || []);
    // useEffect(() => {
    //     fetch(`/api/store/` + query.id)
    //         .then(res => res.json())
    //         .then(json => {
    //             setStores(json);
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
                        <p>Seller name: {item.user.firstName} {item.user.lastName}</p>
                        <p>Review count: {item.reviewCount}</p>
                        <p>Rating: {Number(item.rating).toFixed(1)}</p>
                    </div>
                ))
            }
        </div>
    );
}