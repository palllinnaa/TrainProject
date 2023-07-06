import React, { useEffect } from 'react';
import serverContainer from "../server/container";
import Link from "next/link";
import { connect } from "react-redux"
import { IAllUsersProps } from '../server/interfaces/common';
import clientContainer from '../redux/container'

// export function getServerSideProps(context) {
//     return serverContainer.resolve("UserController").run(context);
// }

function AllUsers(props: IAllUsersProps) {
    const { fetchUsers, data, users } = props;

    useEffect(() => {
        fetchUsers();
    }, []);

    const allUsers = data || users || [];

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                Object.values(allUsers)?.map((user, id) => (
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

const mapStateToProps = (state) => ({
    users: state.entitiesReducer.users
});

const mapDispatchToProps = () => {
    const actionToDispatch = () => clientContainer.resolve('UserSaga').action('fetchUsers');
    return {
        fetchUsers: () => clientContainer.resolve('redux').dispatch(actionToDispatch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)