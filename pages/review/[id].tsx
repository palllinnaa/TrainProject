import { useRouter } from 'next/router'
import { useEffect } from 'react';
import container from '../../server/container';
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import { reviewByIdRequest } from '../../redux/actions/review';
import { IReview, IReviewPageProps, IState } from '../../server/interfaces/common';

// export function getServerSideProps(context) {
//     return container.resolve("ReviewController").run({ ...context, routeName: "/review/:id" });
// }

function ReviewPage(props: IReviewPageProps) {
    const { query } = useRouter();
    const { reviewByIdRequest, data } = props;
    const review: IReview = useSelector((state: IState) => state.reducer.reviews && state.reducer.reviews[Number(query.id)]);

    useEffect(() => {
        if (query?.id && !review) {
            reviewByIdRequest(query.id)
        }
    }, [query, review]);

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

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => {
    return {
        reviewByIdRequest: (id) => dispatch(reviewByIdRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps,)(ReviewPage)