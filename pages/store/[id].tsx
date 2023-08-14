import { useRouter } from 'next/router'
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import { IState, IStore, IStorePageProps, IUser } from '../../server/interfaces/common';
import clientContainer from '../../redux/container'
import { runControllers } from '../../src/utils';
import { showMessage } from '../../components/Toast';

export const getServerSideProps =
    clientContainer.resolve('redux').getServerSideProps(runControllers("StoreController", '/store/:id')
    );

function StorePage(props: IStorePageProps) {
    const { pagination, message, messageType } = props;
    const { query } = useRouter();
    const store: IStore = useSelector((state: IState) => state.entitiesReducer.stores && state.entitiesReducer.stores[Number(query.id)]);
    const user: IUser = useSelector((state: IState) => state.entitiesReducer.users && state.entitiesReducer.users[Number(store.user)]);
    showMessage(message, messageType);

    return (
        <div>
            <Link href={pagination ? `/stores?page=${pagination.currentPage}&limit=${pagination.perPage}` : `/stores?page=1&limit=10`}>Back to stores</Link>
            <h1>Store {store?.id}</h1>
            <p>Store Name: {store?.storeName}</p>
            <p>Seller id: {store?.userId}</p>
            <p>Seller name: {user?.firstName} {user?.lastName}</p>
            <p>Review count: {store?.reviewCount}</p>
            <p>Rating: {store?.rating ? Number(store?.rating).toFixed(1) : '0.0'}</p>
        </div>
    );
}

const mapStateToProps = (state: IState) => ({
    pagination: state.pagination.users,
    message: state.entitiesReducer.responseMessage.message,
    messageType: state.entitiesReducer.responseMessage.messageType
});

export default connect(mapStateToProps)(StorePage);