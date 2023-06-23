import React, { useEffect } from 'react';
import container from '../server/container';
import Link from "next/link";
import { connect } from 'react-redux';
import { reviewsRequest } from '../redux/actions/review';
import { IAllReviewsProps } from '../server/interfaces/common';

// export function getServerSideProps(context) {
//     return container.resolve("ReviewController").run(context);
// }

function AllReviews(props: IAllReviewsProps) {
    const { reviewsRequest, data, reviews } = props;

    useEffect(() => {
        reviewsRequest()
    }, []);
    
    const allReviews = data || reviews || [];

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                Object.values(allReviews)?.map((review, id) => (
                    <div key={id}>
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
    reviews: state.entitiesReducer.reviews
});

const mapDispatchToProps = (dispatch) => {
    return {
        reviewsRequest: () => dispatch(reviewsRequest())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AllReviews)