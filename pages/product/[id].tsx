import { useRouter } from 'next/router'
import Link from 'next/link';
import ProductDetails from '../../components/products/ProductDetails';
import SiteHeader from '../../components/SiteHeader';
import { useSelector } from 'react-redux';
import { IProduct, IProductPageProps, IState } from '../../server/interfaces/common';
import clientContainer from '../../redux/container'
import { runControllers } from '../../src/utils';
import { showMessage } from '../../components/Toast';

export const getServerSideProps =
  clientContainer.resolve('redux').getServerSideProps(runControllers("ProductController", '/product/:id')
  );

function ProductPage(props: IProductPageProps) {
  const { message, messageType } = props;
  const { query } = useRouter();
  const product: IProduct = useSelector((state: IState) => state.entitiesReducer.products && state.entitiesReducer.products[Number(query.id)]);
  showMessage(message, messageType);

  return (
    <div >
      <div className='px-3 font-serif lg:px-4 lg:relative'>
        <SiteHeader />
        <Link href='/'>Home</Link>
        <ProductDetails product={product} />
      </div>
    </div >
  )
}

export default ProductPage;