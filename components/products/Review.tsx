import StarBox from "./StarBox";

export default function Review(props) {
    const {reviewCount, rating} = props;
    return (
        <div className='flex items-center mt-1 text-sm text-gray-600'>
            <StarBox rating={rating} />
            <span className='ml-2'>{reviewCount} Reviews</span>
        </div>
    );
}