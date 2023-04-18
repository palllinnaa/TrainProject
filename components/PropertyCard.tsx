import { ICardData } from "../src/interfaces";
import StarBox from "./StarBox";


interface IPropertyCardProps {
    data: ICardData[];
}

export default function PropertyCard(props: IPropertyCardProps) {
    const { data } = props;
    return (
        <div className="px-4 sm:-mt-6 sm:inline-flex sm:pb-8">
            {
                data.map((item, index) => (
                    <div className="mt-6 sm:w-80 sm:flex-shrink-0 sm:px-2">
                        <div className='relative pb-5/6'>
                            <img className='absolute inset-0 object-cover h-full rounded-lg shadow-md h-54' src={item.image} alt="" />
                        </div>
                        <div className='relative px-3 -mt-16'>
                            <div className='px-4 py-4 bg-white rounded-lg shadow-lg'>
                                <div className='flex'>
                                    <span className='inline-block px-2 py-1 text-xs font-semibold leading-none tracking-wide text-teal-800 uppercase bg-teal-200 rounded-full'>Plus</span>
                                    <div className='ml-2 text-xs font-semibold tracking-wide text-gray-600 uppercase'>
                                    {item.bads} {`${item.bads == 1 ? "bed" : "beds"}`} &bull; {item.baths} {`${item.baths == 1 ? "bath" : "baths"}`}
                                    </div>
                                </div>
                                <h4 className='mt-1 text-lg font-semibold text-gray-900'>{item.title}</h4>
                                <div className='mt-1'>
                                <span className='text-gray-900'>{item.price}</span>
                                    <span className='ml-1 text-sm text-gray-600'>/wk</span>
                                </div>

                                <div className='flex items-center mt-2 text-sm text-gray-600'>
                                    <StarBox rating={item.rating} />
                                    <span className='ml-2'>{item.reviewCount} Reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}


