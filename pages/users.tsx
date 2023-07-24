import React from 'react';
import Link from "next/link";
import { connect } from "react-redux"
import { IAllUsersProps, IState } from '../server/interfaces/common';
import clientContainer from '../redux/container'
import serverContainer from '../server/container';

export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async (context) => {
        return serverContainer.resolve("UserController").run(context, store);
    }
);

function AllUsers(props: IAllUsersProps) {
    const { users } = props;

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                Object.values(users)?.map((user, id) => (
                    <div key={id}>
                        <Link href={`/user/${user.id}`}>User: {user.id}</Link>
                        <p>Name: {user.firstName}</p>
                        <p>Surname: {user.lastName}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    );
};

const mapStateToProps = (state: IState) => ({
    users: state.entitiesReducer.users || []
});

export default connect(mapStateToProps)(AllUsers)