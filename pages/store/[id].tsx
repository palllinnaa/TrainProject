import { useRouter } from 'next/router'
import { useEffect } from 'react';
import serverContainer from '../../server/container';
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import { IStorePageProps, IState, IStore, IUser } from '../../server/interfaces/common';
import clientContainer from '../../redux/container'

// export function getServerSideProps(context) {
//     return serverContainer.resolve("StoreController").run({ ...context, routeName: "/store/:id" });
// }

function StorePage(props: IStorePageProps) {
    const { query } = useRouter();
    const { fetchStoreById, data } = props;
    const store: IStore = useSelector((state: IState) => state.entitiesReducer.stores && state.entitiesReducer.stores[Number(query.id)]);
    const user: IUser = useSelector((state: IState) => state.entitiesReducer.users && state.entitiesReducer.users[Number(store.user)]);

    useEffect(() => {
        if (query?.id && !store) {
            fetchStoreById(query.id)
        }
    }, [query, store]);

    const currentStore = data || store;

    return (
        <div>
            <Link href='/stores'>Back to stores</Link>
            <h1>Store {currentStore?.id}</h1>
            <p>Store Name: {currentStore?.storeName}</p>
            <p>Seller id: {currentStore?.userId}</p>
            <p>Seller name: {user?.firstName} {user?.lastName}</p>
            <p>Review count: {currentStore?.reviewCount}</p>
            <p>Rating: {currentStore?.rating ? Number(currentStore?.rating).toFixed(1) : '0.0'}</p>
        </div>
    );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => {
    const actionToDispatch = (id) => clientContainer.resolve('StoreSaga').action('fetchStoreById', id);
    return {
        fetchStoreById: (id) => clientContainer.resolve('redux').dispatch(actionToDispatch(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StorePage)