import { useRouter } from 'next/router'
import { useEffect } from 'react';
import container from '../../server/container';
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import { IUserPageProps, IStateData } from '../../server/interfaces/common';
import { userByIdRequest } from '../../redux/actions/user';

export function getServerSideProps(context) {
    return container.resolve("UserController").run({ ...context, routeName: "/user/:id" });
}

function UserPage(props: IUserPageProps) {
    const { query } = useRouter();
    const { userByIdRequest, data } = props;
    const user = useSelector((state: IStateData) => state.userReducer?.users?.find((item) => String(item.id) === query.id));

    useEffect(() => {
        if (query?.id && !user) {
            userByIdRequest(query.id);
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
const mapDispatchToProps = (dispatch) => {
    return {
        userByIdRequest: (id) => dispatch(userByIdRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps,)(UserPage)