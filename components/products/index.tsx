import { Product } from '../../src/interfaces';
import ProductCard from './ProductCard';
interface IPropertyCardProps {
    data: Product[];
}


export default function ProductBox(props: IPropertyCardProps) {
    const { data } = props;

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