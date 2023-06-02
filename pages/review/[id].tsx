import { useRouter } from 'next/router'
import { useEffect } from 'react';
import container from '../../server/container';
import Link from 'next/link';
import { connect } from 'react-redux';
import { receivedReviewById } from '../../redux/actions/review';
import { IReviewPageProps } from '../../server/interfaces/common';
import { entity } from '../../server/constants';

export function getServerSideProps(context){
    return container.resolve("ReviewController").run({...context, routeName: "/review/:id"});
}

function ReviewPage(props: IReviewPageProps) {
    const { query } = useRouter();
    const { receivedReviewById, data, review } = props;
    const url = `review/${query.id}`;
    
    useEffect(() => {
        if (query?.id) {
            entity.readData(url)
                .then(result => {
                    receivedReviewById(result);
                })
        }
    }, [query]);
    
    const currentReview = data || review;

    return (
        <div >
            <Link href='/reviews'>Back to reviews</Link>
            <h1>Review  {currentReview?.id}</h1>
            <p>Review text: {currentReview?.reviewText}</p>
            <p>Review count: {currentReview?.reviewCount}</p>
            <p>Rating: {currentReview?.rating}</p>
            <p>User id: {currentReview?.userId}</p>
            <p>Store id: {currentReview?.storeId}</p>
        </div >
    )
}

const mapStateToProps = (state) => ({
    review: state.reviewReducer.review
});

const mapDispatchToProps = (dispatch) => {
    return {
        receivedReviewById: (review) => dispatch(receivedReviewById(review))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReviewPage)