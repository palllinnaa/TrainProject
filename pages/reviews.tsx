import React, { useEffect } from 'react';
import container from '../server/container';
import Link from "next/link";
import { connect } from 'react-redux';
import { receivedReviews } from '../redux/actions/review';
import { IAllReviewsProps } from '../server/interfaces/common';

export function getServerSideProps(context) {
    return container.resolve("ReviewController").run(context);
}

function AllReviews(props: IAllReviewsProps) {
const { receivedReviews, data, reviews } = props;

    useEffect(() => {
        fetch(`/api/reviews`)
            .then(res => res.json())
            .then(json => {
                receivedReviews(json);
            })
    }, []);

    const allReviews = data || reviews || []; 

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                allReviews?.map((review) => (
                    <div>
                        <Link href={`/review/${review.id}`}>Review {review.id}</Link>
                        <p>Review text: {review.reviewText}</p>
                        <p>Review count: {review.reviewCount}</p>
                        <p>Rating: {review.rating}</p>
                        <p>User id: {review.userId}</p>
                        <p>Store id: {review.storeId}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    reviews: state.reviewReducer.reviews
});

const mapDispatchToProps = (dispatch) => {
    return {
        receivedReviews: (reviews) => dispatch(receivedReviews(reviews))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AllReviews)