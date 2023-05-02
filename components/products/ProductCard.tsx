import Link from "next/link";
import PropertyBox from "./PropertyBox";
import StarBox from "./StarBox";
import TextCut from "./TextCut";


export default function ProductCard(props) {
    const { product } = props;
    return (
        // <div className="my-3 sm:w-60 sm:flex-shrink-0 sm:mt-8 lg:mx-5 sm:mx-3">
        //     <div className='relative pb-5/6'>
        //         <img className='absolute inset-0 object-cover w-full h-full rounded-lg shadow-md' src={product.image} alt="" />
        //     </div>
        //     <div className='relative px-3 -mt-16 '>
        //         <div className='px-3 py-3 bg-white rounded-lg shadow-lg'>
        //             <Link href="/product/[id]" as={`/product/${product.id}`} className='mt-1 text-lg font-semibold text-gray-900 hover:text-gray-600 focus:text-gray-600 hover:no-underline'>{product.productName}</Link>
        //             <div className=''>
        //                 <span className='text-gray-600 text-md'>Price: ${product.price}</span>
        //                 <span className='ml-1 text-sm text-gray-300'>/one</span>
        //             </div>
        //             <span className="mt-3 text-sm text-gray-400">{product.description}</span>
        //             <div className="mt-2">
        //                 <StarBox rating={product.rating} />
        //             </div>

        //             {/* <Review reviewCount={product.reviewCount} rating={product.rating} /> */}
        //             <div className="mt-2">
        //                 {
        //                     product.property.map((item) => (
        //                         <span className='inline-block px-2 py-1 mr-2 text-xs leading-none tracking-wide text-gray-800 uppercase bg-gray-100 rounded-full'>{item}</span>
        //                     ))
        //                 }
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="px-2 pb-3 sm:max-w-md lg:max-w-sm">
            <div className="relative pb-5/6">
                <img className='absolute inset-0 object-cover w-full h-full rounded-lg shadow-md' src={product.image} alt="meals or drinks image" />
            </div>
            <div className='relative px-3 -mt-16'>
                <div className='px-3 py-3 bg-white rounded-lg shadow-lg'>
                    <Link href="/product/[id]" as={`/product/${product.id}`} className='mt-1 text-lg font-semibold text-gray-900 hover:text-gray-600 focus:text-gray-600 hover:no-underline'>{product.productName}</Link>
                    <div >
                        <span className='text-gray-600 text-md'>Price: ${product.price}</span>
                        <span className='ml-1 text-sm text-gray-300'>/one</span>
                    </div>
                    {/* <span className="mt-3 overflow-hidden text-sm text-gray-400 text-clip ">{product.description}</span> */}
                    <TextCut text={product.description}/>
                    <div className="mt-2">
                        <StarBox rating={product.rating} />
                    </div>
                    <PropertyBox properties={product.property}/>
                    {/* <div className="mt-2">
                        {
                            product.property.map((item) => (
                                <span className='inline-block px-2 py-1 mr-2 text-xs leading-none tracking-wide text-gray-800 uppercase bg-gray-100 rounded-full'>{item}</span>
                            ))
                        }
                    </div> */}
                </div>
            </div>
        </div>

    );
}
