import React, { useEffect } from 'react';
import container from "../server/container";
import Link from "next/link";
import { connect } from "react-redux"
import { usersRequest } from '../redux/actions/user';
import { IAllUsersProps } from '../server/interfaces/common';

export function getServerSideProps(context) {
    return container.resolve("UserController").run(context);
}

function AllUsers(props: IAllUsersProps) {
    const { usersRequest, data, users } = props;

    useEffect(() => {
        usersRequest()
    }, []);

    const allUsers = data || users || [];

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                allUsers?.map((user, id) => (
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
    users: state.userReducer.users
});

const mapDispatchToProps = (dispatch) => {
    return {
        usersRequest: () => dispatch(usersRequest())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AllUsers)