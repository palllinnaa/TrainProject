import React, { useEffect } from 'react';
import container from '../server/container';
import Link from 'next/link';
import { connect } from 'react-redux';
import { reviewsUsersRequest } from '../redux/actions/review';
import { IAllReviewsUsersProps } from '../server/interfaces/common';

export function getServerSideProps(context) {
    return container.resolve("ReviewController").run(context);
}

function AllReviewsUsers(props: IAllReviewsUsersProps) {
    const { reviewsUsersRequest, data, reviewsUsers } = props;
    const url = 'reviewsUsers';

    useEffect(() => {
        reviewsUsersRequest()
    }, []);
    
    const allReviewsUsers = data || reviewsUsers || [];

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                allReviewsUsers?.map((reviewsUser, id) => (
                    <div key={id}>
                        <Link href={`/reviewsUser/${reviewsUser.id}`}>Review id: {reviewsUser.id}</Link>
                        <p>User id: {reviewsUser.user.id}</p>
                        <p>Name: {reviewsUser.user.firstName}</p>
                        <p>Surname: {reviewsUser.user.lastName}</p>
                        <p>Email: {reviewsUser.user.email}</p>
                        <p>Role: {reviewsUser.user.role}</p>
                        <p>Review Text: {reviewsUser.reviewText}</p>
                        <p>Rating: {reviewsUser.rating}</p>
                        <p>Store id: {reviewsUser.store.id}</p>
                        <p>Store name: {reviewsUser.store.storeName}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    reviewsUsers: state.reviewReducer.reviewsUsers
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