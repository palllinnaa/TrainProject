import React, { useMemo } from 'react';
import { connect } from "react-redux"
import { IAllUsersProps, IState } from '../server/interfaces/common';
import clientContainer from '../redux/container'
import serverContainer from '../server/container';
import Table from '../components/Table';
import SiteHeader from '../components/SiteHeader';

export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async (context) => {
        return serverContainer.resolve("UserController").run(context, store);
    }
);

function AllUsers(props: IAllUsersProps) {
    const { users } = props;

    const columns = useMemo(() => [
        {
            key: "id",
            label: "user id",
        },
        {
            key: "firstName",
            label: "first name",
            linkRout: 'user'
        },
        {
            key: "lastName",
            label: "last name",
        },
        {
            key: "email",
            label: "user email",
        },
        {
            key: "role",
            label: "role",
        },
        {
            key: "slug",
            label: "slug",
        }
    ], [])

    return (
        <div>
            <div className='px-3 pb-3 font-serif border-b border-gray-200'>
                <SiteHeader />
            </div>
            <div className='px-4 py-4 bg-gray-100 md:px-6 md:py-6 '>
                <div className='px-4 bg-white border border-gray-200 rounded-md'>
                    <Table
                        data={Object.values(users)}
                        tableName='All users'
                        caption='Table of all users'
                        columns={columns}
                    ></Table>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IState) => ({
    users: state.entitiesReducer.users || []
});

export default connect(mapStateToProps)(AllUsers)