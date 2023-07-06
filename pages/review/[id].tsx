import { useRouter } from 'next/router'
import { useEffect } from 'react';
import serverContainer from '../../server/container';
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import { IReview, IReviewPageProps, IState } from '../../server/interfaces/common';
import clientContainer from '../../redux/container'

// export function getServerSideProps(context) {
//     return serverContainer.resolve("ReviewController").run({ ...context, routeName: "/review/:id" });
// }

function ReviewPage(props: IReviewPageProps) {
    const { query } = useRouter();
    const { fetchReviewById, data } = props;
    const review: IReview = useSelector((state: IState) => state.entitiesReducer.reviews && state.entitiesReducer.reviews[Number(query.id)]);

    useEffect(() => {
        if (query?.id && !review) {
            fetchReviewById(query.id)
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

const mapDispatchToProps = () => {
    const actionToDispatch = (id) => clientContainer.resolve('ReviewSaga').action('fetchReviewById', id);
    return {
        fetchReviewById: (id) => clientContainer.resolve('redux').dispatch(actionToDispatch(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage)