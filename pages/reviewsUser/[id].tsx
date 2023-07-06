import { useRouter } from 'next/router'
import { useEffect } from 'react';
import serverContainer from '../../server/container';
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import { IReview, IReviewsUserPageProps, IState, IStore, IUser } from '../../server/interfaces/common';
import clientContainer from '../../redux/container'

// export function getServerSideProps(context) {
//     return serverContainer.resolve("ReviewController").run({ ...context, routeName: "/reviewsUser/:id" });
// }

function ReviewsUserPage(props: IReviewsUserPageProps) {
    const { query } = useRouter();
    const { fetchReviewsUserById, data } = props;
    const review: IReview = useSelector((state: IState) => state.entitiesReducer.reviews && state.entitiesReducer.reviews[Number(query.id)]);
    const user: IUser = useSelector((state: IState) => state.entitiesReducer.users && state.entitiesReducer.users[Number(review.user)]);
    const store: IStore = useSelector((state: IState) => state.entitiesReducer.stores && state.entitiesReducer.stores[Number(review.store)]);

    useEffect(() => {
        if (query?.id && !review) {
            fetchReviewsUserById(query.id);
        }
    }, [query, review]);

    const currentReviewsUser = data || review;

    return (
        <div>
            <Link href='/reviewsUsers'>Back to reviews users</Link>
            <h1 >Id: {currentReviewsUser?.id}</h1>
            <p>User id: {user?.id}</p>
            <p>Name: {user?.firstName}</p>
            <p>Surname: {user?.lastName}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
            <p>Review Text: {currentReviewsUser?.reviewText}</p>
            <p>Rating: {currentReviewsUser?.rating}</p>
            <p>Store id: {store?.id}</p>
            <p>Store name: {store?.storeName}</p>
            <p>----------------------------------------------------------------------</p>
        </div>
    )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => {
    const actionToDispatch = (id) => clientContainer.resolve('ReviewSaga').action('fetchReviewsUserById', id);
    return {
        fetchReviewsUserById: (id) => clientContainer.resolve('redux').dispatch(actionToDispatch(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsUserPage)