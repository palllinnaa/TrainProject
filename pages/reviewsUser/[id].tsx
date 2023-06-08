import { useRouter } from 'next/router'
import { useEffect } from 'react';
import container from '../../server/container';
import Link from 'next/link';
import { connect } from 'react-redux';
import { reviewsUserByIdRequest } from '../../redux/actions/review';
import { IReviewsUserPageProps } from '../../server/interfaces/common';

export function getServerSideProps(context) {
    return container.resolve("ReviewController").run({ ...context, routeName: "/reviewsUser/:id" });
}

function ReviewsUserPage(props: IReviewsUserPageProps) {
    const { query } = useRouter();
    const { reviewsUserByIdRequest, data, reviewsUser } = props;
    const url = `reviewsUser/${query.id}`;

    useEffect(() => {
        if (query?.id) {
            reviewsUserByIdRequest(query.id);
        }
    }, [query]);

    const currentReviewsUser = data || reviewsUser;

    return (
        <div>
            <Link href='/reviewsUsers'>Back to reviews users</Link>
            {
                currentReviewsUser?.map((reviewsUser, index) => (
                    <div key={index}>
                        <h1 >Id: {reviewsUser?.id}</h1>
                        <p>User id: {reviewsUser?.user.id}</p>
                        <p>Name: {reviewsUser?.user.firstName}</p>
                        <p>Surname: {reviewsUser?.user.lastName}</p>
                        <p>Email: {reviewsUser?.user.email}</p>
                        <p>Role: {reviewsUser?.user.role}</p>
                        <p>Review Text: {reviewsUser?.reviewText}</p>
                        <p>Rating: {reviewsUser?.rating}</p>
                        <p>Store id: {reviewsUser?.store.id}</p>
                        <p>Store name: {reviewsUser?.store.storeName}</p>
                        <p>----------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    reviewsUser: state.reviewReducer.reviewsUser
});

const mapDispatchToProps = (dispatch) => {
    return {
        reviewsUserByIdRequest: (id) => dispatch(reviewsUserByIdRequest(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReviewsUserPage)