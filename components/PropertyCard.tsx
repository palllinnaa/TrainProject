import { ICardData, Product } from "../src/interfaces";
import StarBox from "./products/StarBox";
import Link from "next/link";


interface IPropertyCardProps {
    data: Product[];
}

export default function PropertyCard(props: IPropertyCardProps) {

    //console.log('props----------------', props);
    const { data } = props;
    return (
        <div className="flex flex-wrap h-full px-4 justify-stretch sm:-mt-6 sm:pb-8">
            {
                data.map((product, index) => (
                    <div className="mt-6 sm:w-80 sm:flex-shrink-0 sm:px-2">
                        <div className='relative pb-5/6'>
                            <img className='absolute inset-0 object-cover h-full rounded-lg shadow-md h-54' src={product.image} alt="" />
                        </div>
                        <div className='relative px-3 -mt-16'>
                            <div className='px-4 py-4 bg-white rounded-lg shadow-lg'>
                                <div className='flex'>
                                    <span className='inline-block px-2 py-1 text-xs font-semibold leading-none tracking-wide text-teal-800 uppercase bg-teal-200 rounded-full'>Plus</span>
                                    <div className='ml-2 text-xs font-semibold tracking-wide text-gray-600 uppercase'>
                                    vegan {product.vegan} &#9702; organic {product.organic}
                                    </div>
                                </div>
                                <Link href="/product/[id]" as={`/product/${product.id}`} className='mt-1 text-lg font-semibold text-gray-900'>{product.productName}</Link>
                                <div className='mt-1'>
                                    <span className='text-gray-900'>${product.price}</span>
                                    <span className='ml-1 text-sm text-gray-600'>/ 1</span>
                                </div>

                                {/* <div className='flex items-center mt-2 text-sm text-gray-600'>
                                    <StarBox rating={product.rating} />
                                    <span className='ml-2'>{product.reviewCount} Reviews</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}


