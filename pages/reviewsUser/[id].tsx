import { useRouter } from 'next/router'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IReview, IState, IStore, IUser } from '../../server/interfaces/common';
import clientContainer from '../../redux/container'
import serverContainer from '../../server/container';

export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async (context) => {
        return serverContainer.resolve("ReviewController").run({ ...context, routeName: "/reviewsUser/:id" }, store);
    }
);

function ReviewsUserPage() {
    const { query } = useRouter();
    const review: IReview = useSelector((state: IState) => state.entitiesReducer.reviews && state.entitiesReducer.reviews[Number(query.id)]);
    const user: IUser = useSelector((state: IState) => state.entitiesReducer.users && state.entitiesReducer.users[Number(review.user)]);
    const store: IStore = useSelector((state: IState) => state.entitiesReducer.stores && state.entitiesReducer.stores[Number(review.store)]);

    return (
        <div>
            <Link href='/reviewsUsers'>Back to reviews users</Link>
            <h1 >Id: {review?.id}</h1>
            <p>User id: {user?.id}</p>
            <p>Name: {user?.firstName}</p>
            <p>Surname: {user?.lastName}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
            <p>Review Text: {review?.reviewText}</p>
            <p>Rating: {review?.rating}</p>
            <p>Store id: {store?.id}</p>
            <p>Store name: {store?.storeName}</p>
            <p>----------------------------------------------------------------------</p>
        </div>
    )
}

export default ReviewsUserPage;