import { useRouter } from 'next/router'
import { useEffect } from 'react';
import container from '../../server/container';
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import { storeByIdRequest } from '../../redux/actions/store';
import { IStorePageProps, IState, IStore, IUser } from '../../server/interfaces/common';

// export function getServerSideProps(context) {
//     return container.resolve("StoreController").run({ ...context, routeName: "/store/:id" });
// }

function StorePage(props: IStorePageProps) {
    const { query } = useRouter();
    const { storeByIdRequest, data } = props;
    const store: IStore = useSelector((state: IState) => state.reducer.stores && state.reducer.stores[Number(query.id)]);
    const user: IUser = useSelector((state: IState) => state.reducer.users && state.reducer.users[Number(store.user)]);

    useEffect(() => {
        if (query?.id && !store) {
            storeByIdRequest(query.id)
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
const mapDispatchToProps = (dispatch) => {
    return {
        storeByIdRequest: (id) => dispatch(storeByIdRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StorePage)