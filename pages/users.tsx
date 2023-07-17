import React from 'react';
import Link from "next/link";
import { connect } from "react-redux"
import { IAllUsersProps, IState } from '../server/interfaces/common';
import clientContainer from '../redux/container'
import { END } from 'redux-saga';

export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async () => {
        const actionToDispatch = () => clientContainer.resolve('UserSaga').action('fetchUsers');
        await store.dispatch(actionToDispatch());
        store.dispatch(END);
        await store.sagaTask.toPromise();
        return { props: {} }
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