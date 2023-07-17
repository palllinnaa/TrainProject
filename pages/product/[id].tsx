import { useRouter } from 'next/router'
import Link from 'next/link';
import ProductDetails from '../../components/products/ProductDetails';
import SiteHeader from '../../components/SiteHeader';
import { useSelector } from 'react-redux';
import { IProduct, IState } from '../../server/interfaces/common';
import clientContainer from '../../redux/container'
import { END } from 'redux-saga';

export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async (context) => {
        const actionToDispatch = (id) => clientContainer.resolve('ProductSaga').action('fetchProductById', id);
        await store.dispatch(actionToDispatch(context.params.id));
        store.dispatch(END);
        await store.sagaTask.toPromise();
        return { props: {} }
    }
);

function ProductPage() {
  const { query } = useRouter();
  const product: IProduct = useSelector((state: IState) => state.entitiesReducer.products && state.entitiesReducer.products[Number(query.id)]);

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