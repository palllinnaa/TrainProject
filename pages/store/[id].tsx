import { useRouter } from 'next/router'
import { useEffect } from 'react';
import container from '../../server/container';
import Link from 'next/link';
import { connect } from 'react-redux';
import { receivedStoreById } from '../../redux/actions/store';
import { IStorePageProps } from '../../server/interfaces/common';


export function getServerSideProps(context) {
    return container.resolve("StoreController").run({...context, routeName: "/store/:id"});
}

function StorePage(props: IStorePageProps) {
    const { query } = useRouter();
    const { receivedStoreById, data, store } = props;

        useEffect(() => {
            if (query?.id) {
                fetch(`/api/store/` + query.id)
                    .then(res => res.json())
                    .then(json => {
                        receivedStoreById(json);
                    })
            }
        }, [query]);

        const currentStore = data || store;

    return (
        <div>
            <Link href='/stores'>Back to stores</Link>
            {
                currentStore?.map((store) => (
                    <div>
                        <h1>Store {store?.id}</h1>
                        <p>Store Name: {store?.storeName}</p>
                        <p>Seller id: {store?.userId}</p>
                        <p>Seller name: {store?.user.firstName} {store?.user.lastName}</p>
                        <p>Review count: {store?.reviewCount}</p>
                        <p>Rating: {Number(store?.rating).toFixed(1)}</p>
                    </div>
                ))
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    store: state.storeReducer.store
});

const mapDispatchToProps = (dispatch) => {
    return {
        receivedStoreById: (store) => dispatch(receivedStoreById(store))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StorePage)