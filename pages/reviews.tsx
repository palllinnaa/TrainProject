import React, { useEffect } from 'react';
import serverContainer from '../server/container';
import Link from "next/link";
import { connect } from 'react-redux';
import { IAllReviewsProps } from '../server/interfaces/common';
import clientContainer from '../redux/container'

// export function getServerSideProps(context) {
//     return serverContainer.resolve("ReviewController").run(context);
// }

function AllReviews(props: IAllReviewsProps) {
    const { fetchReviews, data, reviews } = props;

    useEffect(() => {
        fetchReviews()
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

const mapDispatchToProps = () => {
    const actionToDispatch = () => clientContainer.resolve('ReviewSaga').action('fetchReviews');
    return {
        fetchReviews: () => clientContainer.resolve('redux').dispatch(actionToDispatch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllReviews)