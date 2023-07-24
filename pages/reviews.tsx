import React from 'react';
import Link from "next/link";
import { connect } from 'react-redux';
import { IAllReviewsProps, IState } from '../server/interfaces/common';
import clientContainer from '../redux/container'
import serverContainer from '../server/container';

export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async (context) => {
        return serverContainer.resolve("ReviewController").run(context, store);
    }
);

function AllReviews(props: IAllReviewsProps) {
    const { reviews } = props;

    return (
        <div>
            <Link href='/'>Home</Link>
            {
                Object.values(reviews)?.map((review, id) => (
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

const mapStateToProps = (state: IState) => ({
    reviews: state.entitiesReducer.reviews || []
});

export default connect(mapStateToProps)(AllReviews)