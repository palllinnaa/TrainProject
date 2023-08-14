import React, { useEffect, useMemo } from 'react';
import { connect } from "react-redux"
import { IAllUsersProps, IPaginationParams, IState, ITableColumn } from '../server/interfaces/common';
import clientContainer from '../redux/container'
import Table from '../components/Table';
import SiteHeader from '../components/SiteHeader';
import { runControllers } from '../src/utils';
import { showMessage } from '../components/Toast';
import { changePaginationUrlLocation } from '../server/constants';

const params: IPaginationParams = {
    entityName: 'users',
    pageName: 'users',
    totalCount: 0
}

export const getServerSideProps =
    clientContainer.resolve('redux').getServerSideProps(runControllers("UserController", '/users', params, true)
    );

function AllUsers(props: IAllUsersProps) {
    const {
        users,
        pagination: {
            pages,
            currentPage,
            pageName,
            totalCount,
            perPage,
            filter,
            fetching
        },
        message,
        messageType,
        fetchUsers } = props;

    let paginationData = []
    showMessage(message, messageType)

    useEffect(() => {
        const params = {
            pageName: pageName,
            page: currentPage,
            perPage: perPage,
            totalCount: totalCount,
            filter: filter
        }
        fetchUsers(params);
        changePaginationUrlLocation(currentPage, perPage);
    }, [currentPage, perPage, filter?.columnName, filter?.action, filter?.value])

    if (users && pages[currentPage]) {
        // const paginationIds = Object.values(pages[currentPage]);
        // paginationData = Object.values(users).filter((user) => paginationIds.includes(user.id));
        const usersIds = Object.values(users).map((user) => user.id);
        pages[currentPage].filter((dataId) => usersIds.includes(dataId) && paginationData.push(users[dataId]));
    }

    const columns: ITableColumn[] = useMemo(() => [
        {
            key: "id",
            label: "user id",
        },
        {
            key: "firstName",
            label: "first name",
            linkRout: 'user',
            filter: {
                sortFilter: true,
            }
        },
        {
            key: "lastName",
            label: "last name",
            filter: {
                sortFilter: true,
            }
        },
        {
            key: "email",
            label: "user email",
            filter: {
                sortFilter: true,
            }
        },
        {
            key: "role",
            label: "role",
            filter: {
                comparativeFilter: true,
                values: ['user', 'seller'],
                filterActions: { user: '=', seller: '=' }
            }
        },
        {
            key: "slug",
            label: "slug",
        }
    ], [])

    return (
        <div className='flex flex-col h-full min-h-screen'>
            <div className='px-3 pb-3 font-serif border-b border-gray-200'>
                <SiteHeader />
            </div>
            <div className='flex-1 flex-grow h-full px-4 py-4 bg-gray-100 md:px-6'>
                <div className='px-4 bg-white border border-gray-200 rounded-md'>
                    <Table
                        pagination={true}
                        data={paginationData}
                        tableName='All users'
                        columns={columns}
                        pageName={pageName}
                        currentPage={currentPage}
                        totalCount={totalCount}
                        perPage={perPage}
                        limits={[10, 20, 30]}
                        isFetching={fetching}
                        filter={filter}
                    />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IState) => ({
    users: state.entitiesReducer.users || [],
    pagination: state.pagination.users || [],
    message: state.entitiesReducer.responseMessage.message,
    messageType: state.entitiesReducer.responseMessage.messageType
});

const mapDispatchToProps = (dispatch) => {
    const actionToDispatch = (params) => clientContainer.resolve('UserSaga').action('fetchUsers', params);
    return {
        fetchUsers: (params) => dispatch(actionToDispatch(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)