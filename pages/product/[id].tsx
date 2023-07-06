import { useRouter } from 'next/router'
import { useEffect } from 'react';
import serverContainer from '../../server/container';
import Link from 'next/link';
import ProductDetails from '../../components/products/ProductDetails';
import SiteHeader from '../../components/SiteHeader';
import { connect, useSelector } from 'react-redux';
import { IProduct, IProductPageProps, IState } from '../../server/interfaces/common';
import clientContainer from '../../redux/container'

// export function getServerSideProps(context) {
//   return serverContainer.resolve("ProductController").run({ ...context, routeName: "/product/:id" });
// }

function ProductPage(props: IProductPageProps) {
  const { query } = useRouter();
  const { fetchProductById, data } = props;
  const product: IProduct = useSelector((state: IState) => state.entitiesReducer.products && state.entitiesReducer.products[Number(query.id)]);

  useEffect(() => {
    if (query?.id && !product) {
      fetchProductById(query.id)
    }
  }, [query, product]);

  const currentProduct = data || product;

  return (
    <div >
      <div className='px-3 font-serif lg:px-4 lg:relative'>
        <SiteHeader />
        <Link href='/'>Home</Link>
        <ProductDetails product={currentProduct} />
      </div>
    </div >
  )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => {
  const actionToDispatch = (id) => clientContainer.resolve('ProductSaga').action('fetchProductById', id);
  return {
    fetchProductById: (id) => clientContainer.resolve('redux').dispatch(actionToDispatch(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)