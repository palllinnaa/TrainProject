import { useEffect } from 'react';
import { isEmpty } from '../../server/constants';
import { IProduct } from '../../server/interfaces/common';
import ProductCard from './ProductCard';
interface IPropertyCardProps {
    data: IProduct[];
}


export default function ProductBox(props: IPropertyCardProps) {
    const { data } = props;

    return (
        !isEmpty(data) ? <div className="grid px-4 sm:grid-cols-2 lg:grid-cols-4 sm:pb-8 sm:justify-between" >
            {
                Object.values(data)?.map((product, id) => (
                    <div key={id}>
                        <ProductCard product={product} />
                    </div>
                ))
            }
        </div > : <div className='flex justify-center w-full py-4 mb-6 border-gray-200 border-y'>
            <p className='text-red-500 '>Can't find product with that name!</p>
        </div>
    );
}