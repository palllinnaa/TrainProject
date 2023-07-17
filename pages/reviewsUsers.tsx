import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { IAllReviewsUsersProps, IState } from '../server/interfaces/common';
import clientContainer from '../redux/container'
import { END } from 'redux-saga';

export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async () => {
        const actionToDispatch = () => clientContainer.resolve('ReviewSaga').action('fetchReviewsUsers');
        await store.dispatch(actionToDispatch());
        store.dispatch(END);
        await store.sagaTask.toPromise()
        return { props: {} }
    }
);

function AllReviewsUsers(props: IAllReviewsUsersProps) {
    const { reviewsUsers, users, stores } = props;

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
    stores: state.entitiesReducer.stores || []
});

export default connect(mapStateToProps)(AllReviewsUsers)