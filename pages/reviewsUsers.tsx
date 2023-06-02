import React, { useEffect } from 'react';
import container from '../server/container';
import Link from 'next/link';
import { connect } from 'react-redux';
import { receivedReviewsUsers } from '../redux/actions/review';
import { IAllReviewsUsersProps } from '../server/interfaces/common';
import { entity } from '../server/constants';

export function getServerSideProps(context) {
    return container.resolve("ReviewController").run(context);
}

function AllReviewsUsers(props: IAllReviewsUsersProps) {
    const { receivedReviewsUsers, data, reviewsUsers } = props;
    const url = 'reviewsUsers';
    
    useEffect(() => {
        entity.readData(url)
            .then(result => {
                receivedReviewsUsers(result);
            })
    }, []);
    
    const allReviewsUsers = data || reviewsUsers || [];

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                allReviewsUsers?.map((reviewsUser) => (
                    <div>
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
        receivedReviewsUsers: (reviewsUsers) => dispatch(receivedReviewsUsers(reviewsUsers))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AllReviewsUsers)