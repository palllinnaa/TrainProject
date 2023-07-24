import { useRouter } from 'next/router'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IState, IUser } from '../../server/interfaces/common';
import clientContainer from '../../redux/container';
import serverContainer from '../../server/container';

export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async (context) => {
        return serverContainer.resolve("UserController").run({ ...context, routeName: "/user/:id" }, store);
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