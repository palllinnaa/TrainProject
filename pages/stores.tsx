import React, { useEffect } from 'react';
import container from '../server/container';
import Link from "next/link";
import { connect } from 'react-redux';
import { storesRequest } from '../redux/actions/store';
import { IAllStoresProps } from '../server/interfaces/common';

export function getServerSideProps(context) {
    return container.resolve("StoreController").run(context);
}

function AllStores(props: IAllStoresProps) {
    const { storesRequest, data, stores } = props;

    useEffect(() => {
        storesRequest();
    }, []);

    const allStores = data || stores || [];

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                allStores?.map((store, id) => (
                    <div key={id}>
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

const mapStateToProps = (state) => ({
    stores: state.storeReducer.stores
});

const mapDispatchToProps = (dispatch) => {
    return {
        storesRequest: () => dispatch(storesRequest())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AllStores)