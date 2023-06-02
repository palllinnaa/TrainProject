import React, { useEffect } from 'react';
import container from '../server/container';
import Link from "next/link";
import { connect } from 'react-redux';
import { receivedStores } from '../redux/actions/store';
import { IAllStoresProps } from '../server/interfaces/common';
import { entity } from '../server/constants';

export function getServerSideProps(context) {
    return container.resolve("StoreController").run(context);
}

function AllStores(props: IAllStoresProps) {
    const { receivedStores, data, stores } = props;
    const url = 'stores';
    
    useEffect(() => {
        entity.readData(url)
            .then(result => {
                receivedStores(result);
            })
    }, []);
    
    const allStores = data || stores || [];

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                allStores?.map((store) => (
                    <div>
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
        receivedStores: (stores) => dispatch(receivedStores(stores))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AllStores)