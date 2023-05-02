import { Product } from '../../src/interfaces';
import ProductCard from './ProductCard';
import ProductDetails from './ProductDetails';

// to map data

interface IPropertyCardProps {
    data: Product[];
}


export default function ProductBox(props: IPropertyCardProps) {
    const { data } = props;

    //console.log('data------------------------------------------------------------------------------------------------------------', data);

    return (
        <div className="grid px-4 sm:grid-cols-2 lg:grid-cols-4 sm:pb-8 sm:justify-between">
            {
                data.map((product) => (
                    <div>
                        <ProductCard product={product} />
                    </div>
                ))
            }
        </div>
    );

}

