import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { IAllStoresProps, IState } from '../server/interfaces/common';
import clientContainer from '../redux/container'
import serverContainer from '../server/container';
import Table from '../components/Table';
import SiteHeader from '../components/SiteHeader';
import StarBox from '../components/products/StarBox';


export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async (context) => {
        return serverContainer.resolve("StoreController").run(context, store);
    }
);

function AllStores(props: IAllStoresProps) {
    const { stores, users } = props;
    let data = [];

    Object.values(stores)?.map((store) => (
        Object.values(users)?.map((user) => {
            if (user.id === store.user) {
                let item = {
                    ...store,
                    rating: Number(store.rating).toFixed(1),
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                data.push(item)
            }
        })
    ))

    const columns = useMemo(() => [
        {
            key: "id",
            label: "store id",
        },
        {
            key: "storeName",
            label: "store name",
            linkRout: 'store'
        },
        {
            key: "userId",
            label: "seller id",
        },
        {
            key: "firstName",
            label: "seller first name",
        },
        {
            key: "lastName",
            label: "seller last name",
        },
        {
            key: "reviewCount",
            label: "review count",
        },
        {
            key: "rating",
            label: "rating",
            render: (value) => (<div className='flex items-center justify-start'>
                <div className='text-sm'>
                    {
                        value < 1.9 ? <p className='text-red-500'>{value}</p> :
                            value < 3.8 ? <p className='text-blue-500'>{value}</p> :
                                value <= 5 && <p className='text-green-500'>{value}</p>
                    }
                </div>
                <div className='pl-3'>
                    <StarBox rating={value} />
                </div>
            </div>)
        }
    ], [])

    return (
        <div>
            <div className='px-3 pb-3 font-serif border-b border-gray-200'>
                <SiteHeader />
            </div>
            <div className='px-4 py-4 bg-gray-100 md:px-6 md:py-6 '>
                <div className='px-4 py-4 bg-white border border-gray-200 rounded-md'>
                    <Table
                        data={data}
                        tableName='All stores'
                        columns={columns}
                    ></Table>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: IState) => ({
    stores: state.entitiesReducer.stores || [],
    users: state.entitiesReducer.users || []
});

export default connect(mapStateToProps)(AllStores)