import React, { useEffect } from 'react';
import container from '../server/container';
import Link from 'next/link';
import { connect } from 'react-redux';
import { reviewsUsersRequest } from '../redux/actions/review';
import { IAllReviewsUsersProps } from '../server/interfaces/common';

// export function getServerSideProps(context) {
//     return container.resolve("ReviewController").run(context);
// }

function AllReviewsUsers(props: IAllReviewsUsersProps) {
    const { reviewsUsersRequest, data, reviewsUsers, users, stores } = props;

    useEffect(() => {
        reviewsUsersRequest()
    }, []);
    
    const allReviewsUsers = data || reviewsUsers || [];

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                Object.values(allReviewsUsers)?.map((reviewsUser, id) => (
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

const mapStateToProps = (state) => ({
    reviewsUsers: state.entitiesReducer.reviews,
    users: state.entitiesReducer.users,
    stores: state.entitiesReducer.stores
});

const mapDispatchToProps = (dispatch) => {
    return {
        reviewsUsersRequest: () => dispatch(reviewsUsersRequest())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AllReviewsUsers)