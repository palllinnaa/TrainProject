import { useRouter } from 'next/router'
import { useEffect } from 'react';
import container from '../../server/container';
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import { reviewsUserByIdRequest } from '../../redux/actions/review';
import { IReviewsUserPageProps, IStateData } from '../../server/interfaces/common';

export function getServerSideProps(context) {
    return container.resolve("ReviewController").run({ ...context, routeName: "/reviewsUser/:id" });
}

function ReviewsUserPage(props: IReviewsUserPageProps) {
    const { query } = useRouter();
    const { reviewsUserByIdRequest, data } = props;
    const reviewsUser = useSelector((state: IStateData) => state.reviewReducer.reviewsUsers?.find((item) => String(item.id) === query.id));

    useEffect(() => {
        if (query?.id && !reviewsUser) {
            reviewsUserByIdRequest(query.id);
        }
    }, [query, reviewsUser]);

    const currentReviewsUser = data || reviewsUser;

    return (
        <div>
            <Link href='/reviewsUsers'>Back to reviews users</Link>
                <h1 >Id: {currentReviewsUser?.id}</h1>
                <p>User id: {currentReviewsUser?.user.id}</p>
                <p>Name: {currentReviewsUser?.user.firstName}</p>
                <p>Surname: {currentReviewsUser?.user.lastName}</p>
                <p>Email: {currentReviewsUser?.user.email}</p>
                <p>Role: {currentReviewsUser?.user.role}</p>
                <p>Review Text: {currentReviewsUser?.reviewText}</p>
                <p>Rating: {currentReviewsUser?.rating}</p>
                <p>Store id: {currentReviewsUser?.store.id}</p>
                <p>Store name: {currentReviewsUser?.store.storeName}</p>
                <p>----------------------------------------------------------------------</p>
        </div>
    )
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => {
    return {
        reviewsUserByIdRequest: (id) => dispatch(reviewsUserByIdRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps,)(ReviewsUserPage)