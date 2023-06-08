import { useRouter } from 'next/router'
import { useEffect } from 'react';
import container from '../../server/container';
import Link from 'next/link';
import { connect } from 'react-redux';
import { storeByIdRequest } from '../../redux/actions/store';
import { IStorePageProps } from '../../server/interfaces/common';

export function getServerSideProps(context) {
    return container.resolve("StoreController").run({ ...context, routeName: "/store/:id" });
}

function StorePage(props: IStorePageProps) {
    const { query } = useRouter();
    const { storeByIdRequest, data, store } = props;
    
    useEffect(() => {
        if (query?.id) {
            storeByIdRequest(query.id)
        }
    }, [query]);
    
    const currentStore = data || store;

    return (
        <div>
            <Link href='/stores'>Back to stores</Link>
            {
                currentStore?.map((store, index) => (
                    <div key={index}>
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
        storeByIdRequest: (id) => dispatch(storeByIdRequest(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StorePage)