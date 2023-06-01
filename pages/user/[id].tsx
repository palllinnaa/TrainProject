import { useRouter } from 'next/router'
import { useEffect } from 'react';
import container from '../../server/container';
import Link from 'next/link';
import { connect } from 'react-redux';
import { receivedUserById } from '../../redux/actions/user';
import { IUserPageProps } from '../../server/interfaces/common';

export function getServerSideProps(context) {
    return container.resolve("UserController").run({ ...context, routeName: "/user/:id" });
}

function UserPage(props: IUserPageProps) {
    const { query } = useRouter();
    const { receivedUserById, data, user } = props;

    useEffect(() => {
        if (query?.id) {
            fetch(`/api/user/` + query.id)
                .then(res => res.json())
                .then(json => {
                    receivedUserById(json);
                })
        }
    }, [query]);

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

const mapStateToProps = (state) => ({
    user: state.userReducer.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        receivedUserById: (user) => dispatch(receivedUserById(user))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserPage)