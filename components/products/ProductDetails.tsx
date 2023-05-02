import PropertyBox from "./PropertyBox";
import Review from "./Review";

export default function ProductDetails(props) {
    const { product } = props;
  
    return (
        // <div>
        //     <main className='py-6 '>
        //         <div className="mt-1 sm:w-80 sm:flex-shrink-0 sm:px-2">
        //             <div className='px-4'>
        //                 <div className='relative pb-5/6'>
        //                     <img className='absolute inset-0 object-cover h-full mt-2 rounded-lg shadow-md h-54' src={product.image} alt="" />
        //                 </div>
        //                 <h1 className='text-lg font-semibold text-gray-900 sm:text-'>{product.productName}</h1>
        //                 <div className='grid mt-6 ml-2 text-xs font-semibold tracking-wide text-gray-600 uppercase place-items-center'>
        //                     vegan {product.vegan} &#9702; organic {product.organic}
        //                 </div>
        //                 <h2 className='mt-3 font-semibold text-gray-700 '>Price ${product.price} / 1</h2>
        //                 <div className='mt-1'>
        //                     <h3 className='font-semibold text-gray-700 text-md'>Ingredients:</h3>
        //                     <div>
        //                         {
        //                             product.ingredients.map((ingredient) => (
        //                                 <p className='ml-3 text-sm text-gray-600'>&#9702; {ingredient}</p>
        //                             ))
        //                         }
        //                     </div>
        //                     <Review reviewCount={product.reviewCount} rating={product.rating} />
        //                 </div>
        //             </div>
        //         </div>
        //     </main>
        // </div>
        // <div >
        //     <div className="md:justify-between md:flex">
        //         <div className="">
        //             <div className='font-serif '>
        //                 <img className='object-cover h-full mt-3 rounded-lg shadow-md md:h-64 lg:h-72' src={product.image} alt="meals/drinks image" />
        //             </div>
        //             <div className="px-2 mt-2">
        //                 <PropertyBox properties={product.property} />
        //             </div>
        //         </div>
        //         <div className="md:flex-1 md:ml-5 md:leading-7">
        //             <h1 className='mt-3 text-lg font-semibold text-gray-900 sm:text-'>{product.productName}</h1>
        //             <span className="mt-4 text-sm text-gray-500 text-clip ">{product.description}</span>
        //             {/* <div className="md:absolute md:bottom-8">
        //                 <Review reviewCount={product.reviewCount} rating={product.rating}></Review>
        //             </div> */}
        //         </div>

        //     </div>
        //     <h3 className='mt-2 font-semibold text-gray-900 text-md sm:text-'>Ingredients:</h3>
        //     <div>
        //         {
        //             product.ingredients.map((ingredient) => (
        //                 <p className='mt-1 ml-3 text-sm text-gray-600'>&#9702; {ingredient}</p>
        //             ))
        //         }
        //     </div>
        //     <Review reviewCount={product.reviewCount} rating={product.rating}></Review>
        //     <div className="flex items-center justify-between my-3 ">
        //         <div className="">
        //             <span className='font-semibold text-gray-600 text-md'>Price: </span>
        //             <span className='text-lg font-semibold text-gray-600'>${product.price}</span>
        //             <span className='ml-1 text-sm text-gray-400'>/one</span>
        //         </div>
        //         <div className="flex items-center">
        //             <button className="px-1.5 py-1.5 bg-gray-200 rounded-full focus:border border-gray-400 hover:border">
        //                 <img className="h-4" src="../images/heart_icon.png" alt="heart icon" />
        //             </button>
        //             <button className="flex items-center justify-between px-2 py-2 ml-2 bg-black rounded-lg focus:bg-gray-700 hover:bg-gray-700">
        //                 <span className="px-2 text-sm font-medium text-white ">Add to card</span>
        //                 <img className="h-6 px-1 py-1 bg-gray-800 rounded-lg" src="../images/shopping_cart_icon.png" alt="shopping cart icon" />
        //             </button>
        //         </div>
        //     </div>
        // </div>
        <div >
            <div className="">
                <div className="">
                    <div className='font-serif '>
                        <img className='object-cover h-full mt-3 rounded-lg shadow-md md:h-80 md:w-full lg:w-auto' src={product.image} alt="meals/drinks image" />
                    </div>
                    <div className="px-2 mt-2">
                        <PropertyBox properties={product.property} />
                    </div>
                </div>
                <div className="">
                    <h1 className='mt-3 text-lg font-semibold text-gray-900'>{product.productName}</h1>
                    <span className="mt-4 text-sm text-gray-500 text-clip ">{product.description}</span>
                    {/* <div className="md:absolute md:bottom-8">
                        <Review reviewCount={product.reviewCount} rating={product.rating}></Review>
                    </div> */}
                </div>

            </div>
            <div className="">
                <h3 className='mt-2 font-semibold text-gray-900 text-md '>Ingredients:</h3>
                <div>
                    {
                        product.ingredients?.map((ingredient) => (
                            <p className='mt-1 ml-3 text-sm text-gray-600'>&#9702; {ingredient}</p>
                        ))
                    }
                </div>
            </div>
            <Review reviewCount={product.reviewCount} rating={product.rating}></Review>
            <div className="flex items-center justify-between my-3 ">
                <div className="">
                    <span className='font-semibold text-gray-600 text-md'>Price: </span>
                    <span className='text-lg font-semibold text-gray-600'>${product.price}</span>
                    <span className='ml-1 text-sm text-gray-400'>/one</span>
                </div>
                <div className="flex items-center">
                    <button className="px-1.5 py-1.5 bg-gray-200 rounded-full focus:border border-gray-400 hover:border">
                        <img className="h-4" src="../images/heart_icon.png" alt="heart icon" />
                    </button>
                    <button className="flex items-center justify-between px-2 py-2 ml-2 bg-black rounded-lg focus:bg-gray-700 hover:bg-gray-700">
                        <span className="px-2 text-sm font-medium text-white ">Add to card</span>
                        <img className="h-6 px-1 py-1 bg-gray-800 rounded-lg" src="../images/shopping_cart_icon.png" alt="shopping cart icon" />
                    </button>
                </div>
            </div>
        </div>
    )
}
