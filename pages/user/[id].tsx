import { useRouter } from 'next/router'
import { useEffect } from 'react';
import serverContainer from '../../server/container';
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import { IUserPageProps, IState, IUser } from '../../server/interfaces/common';
import clientContainer from '../../redux/container';

// export function getServerSideProps(context) {
//     return serverContainer.resolve("UserController").run({ ...context, routeName: "/user/:id" });
// }

function UserPage(props: IUserPageProps) {
    const { query } = useRouter();
    const { fetchUserById, data } = props;
    const user: IUser = useSelector((state: IState) => state.entitiesReducer.users && state.entitiesReducer.users[Number(query.id)]);

    useEffect(() => {
        if (query?.id && !user) {
            fetchUserById(query.id);
        }
    }, [query, user]);

    const currentUser = data || user;

    return (
        <div >
            <Link href='/users'>Back to users</Link>
            <h1>User {currentUser?.id}</h1>
            <p>Name: {currentUser?.firstName}</p>
            <p>Surname: {currentUser?.lastName}</p>
            <p>Email: {currentUser?.email}</p>
            <p>Role: {currentUser?.role}</p>
        </div >
    )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => {
    const actionToDispatch = (id) => clientContainer.resolve('UserSaga').action('fetchUserById', id);
    return {
        fetchUserById: (id) => clientContainer.resolve('redux').dispatch(actionToDispatch(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)