import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { IAllStoresProps, IPaginationParams, IState, ITableColumn } from '../server/interfaces/common';
import clientContainer from '../redux/container'
import Table from '../components/Table';
import SiteHeader from '../components/SiteHeader';
import StarBox from '../components/products/StarBox';
import { runControllers } from '../src/utils';
import { showMessage } from '../components/Toast';
import { changePaginationUrlLocation } from '../server/constants';

const params: IPaginationParams = {
    entityName: 'stores',
    pageName: 'stores',
    totalCount: 0
}

export const getServerSideProps =
    clientContainer.resolve('redux').getServerSideProps(runControllers("StoreController", '/stores', params, true)
    );

function AllStores(props: IAllStoresProps) {
    const {
        stores,
        users,
        pagination: {
            pages,
            currentPage,
            pageName,
            totalCount,
            perPage,
            filter,
            fetching
        }, message,
        messageType,
        fetchStores } = props;

    let data = [];
    let paginationData = []
    showMessage(message, messageType);

    useEffect(() => {
        const params = {
            pageName: pageName,
            page: currentPage,
            perPage: perPage,
            totalCount: totalCount,
            filter: filter
        }
        fetchStores(params);
        changePaginationUrlLocation(currentPage, perPage);
    }, [currentPage, perPage, filter?.columnName + filter?.action + filter?.value])

    Object.values(stores)?.map((store) => (
        Object.values(users)?.map((user) => {
            if (user.id === store.user) {
                let item = {
                    ...store,
                    rating: Number(store.rating).toFixed(1),
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                data = {
                    ...data,
                    [item.id]: item

                }
            }
        })
    ))


    if (data && pages[currentPage]) {
        // const paginationIds = Object.values(pages[currentPage]);
        // paginationData = Object.values(users).filter((user) => paginationIds.includes(user.id));

        const dataIds = Object.values(data).map((item) => item.id);
        pages[currentPage].filter((dataId) => dataIds.includes(dataId) && paginationData.push(data[dataId]));
    }

    const columns: ITableColumn[] = useMemo(() => [
        {
            key: "id",
            label: "store id",
        },
        {
            key: "storeName",
            label: "store name",
            linkRout: 'store',
            filter: {
                sortFilter: true,
            }
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
            filter: {
                sortFilter: true,
            }
        },
        {
            key: "rating",
            label: "rating",
            filter: {
                sortFilter: true,
            },
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
        <div className='flex flex-col h-screen'>
            <div className='px-3 pb-3 font-serif border-b border-gray-200'>
                <SiteHeader />
            </div>
            <div className='flex-1 flex-grow h-full px-4 py-4 bg-gray-100 md:px-6 md:py-6 '>
                <div className='px-4 py-4 bg-white border border-gray-200 rounded-md'>
                    <Table
                        pagination={true}
                        data={paginationData}
                        tableName='All stores'
                        columns={columns}
                        pageName={pageName}
                        currentPage={currentPage}
                        totalCount={totalCount}
                        perPage={perPage}
                        limits={[10, 20, 30]}
                        isFetching={fetching}
                        filter={filter}
                    ></Table>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: IState) => ({
    stores: state.entitiesReducer.stores || [],
    users: state.entitiesReducer.users || [],
    pagination: state.pagination.stores || [],
    message: state.entitiesReducer.responseMessage.message,
    messageType: state.entitiesReducer.responseMessage.messageType
});

const mapDispatchToProps = (dispatch) => {
    const actionToDispatch = (params) => clientContainer.resolve('StoreSaga').action('fetchStores', params);
    return {
        fetchStores: (params) => dispatch(actionToDispatch(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStores)