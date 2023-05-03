import Link from "next/link";
import PropertyBox from "./PropertyBox";
import StarBox from "./StarBox";
import TextCut from "./TextCut";

export default function ProductCard(props) {
    const { product } = props;

    return (
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
                    <TextCut text={product.description} />
                    <div className="mt-2">
                        <StarBox rating={product.rating} />
                    </div>
                    <PropertyBox properties={product.property} />
                </div>
            </div>
        </div>
    );
}