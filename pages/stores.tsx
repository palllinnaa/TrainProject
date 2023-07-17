import React from 'react';
import Link from "next/link";
import { connect } from 'react-redux';
import { IAllStoresProps, IState } from '../server/interfaces/common';
import clientContainer from '../redux/container'
import { END } from 'redux-saga';

export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async () => {
        const actionToDispatch = () => clientContainer.resolve('StoreSaga').action('fetchStores');
        await store.dispatch(actionToDispatch());
        store.dispatch(END);
        await store.sagaTask.toPromise()
        return { props: {} }
    }
);

function AllStores(props: IAllStoresProps) {
    const { stores, users } = props;

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                Object.values(stores)?.map((store, id) => (
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

const mapStateToProps = (state: IState) => ({
    stores: state.entitiesReducer.stores || [],
    users: state.entitiesReducer.users || []
});

export default connect(mapStateToProps)(AllStores)