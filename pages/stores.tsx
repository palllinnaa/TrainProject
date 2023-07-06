import React, { useEffect } from 'react';
import serverContainer from '../server/container';
import Link from "next/link";
import { connect } from 'react-redux';
import { IAllStoresProps } from '../server/interfaces/common';
import clientContainer from '../redux/container'

// export function getServerSideProps(context) {
//     return serverContainer.resolve("StoreController").run(context);
// }

function AllStores(props: IAllStoresProps) {
    const { fetchStores, data, stores, users } = props;

    useEffect(() => {
        fetchStores();
    }, []);

    const allStores = data || stores || [];

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                Object.values(allStores)?.map((store, id) => (
                    <div key={id}>
                        <Link href={`/store/${store.id}`}>store: {store.id}</Link>
                        <p>Store Name: {store.storeName}</p>
                        <p>Seller id: {store.userId}</p>
                        <p>Seller name: {users && users[Number(store.user)]?.firstName} {users && users[Number(store.user)]?.lastName}</p>
                        <p>Review count: {store.reviewCount}</p>
                        <p>Rating: {Number(store.rating).toFixed(1)}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    stores: state.entitiesReducer.stores,
    users: state.entitiesReducer.users
});

const mapDispatchToProps = () => {
    const actionToDispatch = () => clientContainer.resolve('StoreSaga').action('fetchStores');
    return {
        fetchStores: () => clientContainer.resolve('redux').dispatch(actionToDispatch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStores)