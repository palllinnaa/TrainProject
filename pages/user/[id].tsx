import { useRouter } from 'next/router'
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import { IState, IUser, IUserPageProps } from '../../server/interfaces/common';
import clientContainer from '../../redux/container';
import { runControllers } from '../../src/utils';
import { showMessage } from '../../components/Toast';

export const getServerSideProps =
    clientContainer.resolve('redux').getServerSideProps(runControllers("UserController", '/user/:id')
    );


function UserPage(props: IUserPageProps) {
    const { pagination, message, messageType } = props;
    const { query } = useRouter();
    const user: IUser = useSelector((state: IState) => state.entitiesReducer.users && state.entitiesReducer.users[Number(query.id)]);
    showMessage(message, messageType);

    return (
        <div >
            <Link href={pagination ? `/users?page=${pagination.currentPage}&limit=${pagination.perPage}` : `/users?page=1&limit=10`}>Back to users</Link>
            <h1>User {user?.id}</h1>
            <p>Name: {user?.firstName}</p>
            <p>Surname: {user?.lastName}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
        </div >
    )
}

const mapStateToProps = (state: IState) => ({
    pagination: state.pagination.users,     
    message: state.entitiesReducer.responseMessage.message,
    messageType: state.entitiesReducer.responseMessage.messageType
});

export default connect(mapStateToProps)(UserPage);