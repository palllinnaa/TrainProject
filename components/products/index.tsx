import { IProduct } from '../../server/interfaces/common';
import ProductCard from './ProductCard';
interface IPropertyCardProps {
    data: IProduct[];
}


export default function ProductBox(props: IPropertyCardProps) {
    const { data } = props;

    return (
        <div className="grid px-4 sm:grid-cols-2 lg:grid-cols-4 sm:pb-8 sm:justify-between">
            {
                Object.values(data)?.map((product, id) => (
                    <div key={id}>
                        <ProductCard product={product} />
                    </div>
                ))
            }
        </div>
    );
}