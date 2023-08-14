import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { IAllReviewsUsersProps, IState } from '../server/interfaces/common';
import clientContainer from '../redux/container'
import { runControllers } from '../src/utils';
import { showMessage } from '../components/Toast';

export const getServerSideProps =
    clientContainer.resolve('redux').getServerSideProps(runControllers("ReviewController")
    );

function AllReviewsUsers(props: IAllReviewsUsersProps) {
    const { reviewsUsers, users, stores, message, messageType } = props;
    showMessage(message, messageType);

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                Object.values(reviewsUsers)?.map((reviewsUser, id) => (
                    <div key={id}>
                        <Link href={`/reviewsUser/${reviewsUser.id}`}>Review id: {reviewsUser.id}</Link>
                        <p>User id: {users && users[Number(reviewsUser.user)]?.id}</p>
                        <p>Name: {users && users[Number(reviewsUser.user)]?.firstName}</p>
                        <p>Surname: {users && users[Number(reviewsUser.user)]?.lastName}</p>
                        <p>Email: {users && users[Number(reviewsUser.user)]?.email}</p>
                        <p>Role: {users && users[Number(reviewsUser.user)]?.role}</p>
                        <p>Review Text: {reviewsUser.reviewText}</p>
                        <p>Rating: {reviewsUser.rating}</p>
                        <p>Store id: {stores && stores[Number(reviewsUser.store)]?.id}</p>
                        <p>Store name: {stores && stores[Number(reviewsUser.store)]?.storeName}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    );
}

const mapStateToProps = (state: IState) => ({
    reviewsUsers: state.entitiesReducer.reviews || [],
    users: state.entitiesReducer.users || [],
    stores: state.entitiesReducer.stores || [],
    message: state.entitiesReducer.responseMessage.message,
    messageType: state.entitiesReducer.responseMessage.messageType
});

export default connect(mapStateToProps)(AllReviewsUsers)