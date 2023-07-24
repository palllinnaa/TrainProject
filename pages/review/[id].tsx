import { useRouter } from 'next/router'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IReview, IState } from '../../server/interfaces/common';
import clientContainer from '../../redux/container'
import serverContainer from '../../server/container';


export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async (context) => {
        return serverContainer.resolve("ReviewController").run({ ...context, routeName: "/review/:id" }, store);
    }
);

function ReviewPage() {
    const { query } = useRouter();
    const review: IReview = useSelector((state: IState) => state.entitiesReducer.reviews && state.entitiesReducer.reviews[Number(query.id)]);

    return (
        <div >
            <Link href='/reviews'>Back to reviews</Link>
            <h1>Review  {review?.id}</h1>
            <p>Review text: {review?.reviewText}</p>
            <p>Review count: {review?.reviewCount}</p>
            <p>Rating: {review?.rating}</p>
            <p>User id: {review?.userId}</p>
            <p>Store id: {review?.storeId}</p>
        </div >
    )
}

export default ReviewPage;