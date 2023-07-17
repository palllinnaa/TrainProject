import { useRouter } from 'next/router'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IState, IUser } from '../../server/interfaces/common';
import clientContainer from '../../redux/container';
import { END } from 'redux-saga';

export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async (context) => {
        const actionToDispatch = (id) => clientContainer.resolve('UserSaga').action('fetchUserById', id);
        await store.dispatch(actionToDispatch(context.params.id));
        store.dispatch(END);
        await store.sagaTask.toPromise();
        return { props: {} }
    }
);

function UserPage() {
    const { query } = useRouter();
    const user: IUser = useSelector((state: IState) => state.entitiesReducer.users && state.entitiesReducer.users[Number(query.id)]);

    return (
        <div >
            <Link href='/users'>Back to users</Link>
            <h1>User {user?.id}</h1>
            <p>Name: {user?.firstName}</p>
            <p>Surname: {user?.lastName}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
        </div >
    )
}

export default UserPage;