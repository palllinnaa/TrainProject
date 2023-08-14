import { useRouter } from 'next/router'
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import { IReview, IReviewPageProps, IState } from '../../server/interfaces/common';
import clientContainer from '../../redux/container'
import { runControllers } from '../../src/utils';
import { showMessage } from '../../components/Toast';


export const getServerSideProps =
    clientContainer.resolve('redux').getServerSideProps(runControllers("ReviewController", '/review/:id')
    );

function ReviewPage(props: IReviewPageProps) {
    const { message, messageType } = props;
    const { query } = useRouter();
    const review: IReview = useSelector((state: IState) => state.entitiesReducer.reviews && state.entitiesReducer.reviews[Number(query.id)]);
    showMessage(message, messageType);

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

const mapStateToProps = (state: IState) => ({
    message: state.entitiesReducer.responseMessage.message,
    messageType: state.entitiesReducer.responseMessage.messageType
});

export default connect(mapStateToProps)(ReviewPage);