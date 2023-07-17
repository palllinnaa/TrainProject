import { useRouter } from 'next/router'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IState, IStore, IUser } from '../../server/interfaces/common';
import clientContainer from '../../redux/container'
import { END } from 'redux-saga';

export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async (context) => {
        const actionToDispatch = (id) => clientContainer.resolve('StoreSaga').action('fetchStoreById', id);
        await store.dispatch(actionToDispatch(context.params.id));
        store.dispatch(END);
        await store.sagaTask.toPromise();
        return { props: {} }
    }
);

function StorePage() {
    const { query } = useRouter();
    const store: IStore = useSelector((state: IState) => state.entitiesReducer.stores && state.entitiesReducer.stores[Number(query.id)]);
    const user: IUser = useSelector((state: IState) => state.entitiesReducer.users && state.entitiesReducer.users[Number(store.user)]);

    return (
        <div>
            <Link href='/stores'>Back to stores</Link>
            <h1>Store {store?.id}</h1>
            <p>Store Name: {store?.storeName}</p>
            <p>Seller id: {store?.userId}</p>
            <p>Seller name: {user?.firstName} {user?.lastName}</p>
            <p>Review count: {store?.reviewCount}</p>
            <p>Rating: {store?.rating ? Number(store?.rating).toFixed(1) : '0.0'}</p>
        </div>
    );
}

export default StorePage;