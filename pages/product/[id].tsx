import { useRouter } from 'next/router'
import { useEffect } from 'react';
import container from '../../server/container';
import Link from 'next/link';
import ProductDetails from '../../components/products/ProductDetails';
import SiteHeader from '../../components/SiteHeader';
import { connect, useSelector } from 'react-redux';
import { productByIdRequest } from '../../redux/actions/product';
import { IProduct, IProductPageProps, IState } from '../../server/interfaces/common';

// export function getServerSideProps(context) {
//   return container.resolve("ProductController").run({ ...context, routeName: "/product/:id" });
// }

function ProductPage(props: IProductPageProps) {
  const { query } = useRouter();
  const { productByIdRequest, data } = props;
  const product: IProduct = useSelector((state: IState) => state.reducer.products && state.reducer.products[Number(query.id)]);

  useEffect(() => {
    if (query?.id && !product) {
      productByIdRequest(query.id)
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
const mapDispatchToProps = (dispatch) => {
  return {
    productByIdRequest: (id) => dispatch(productByIdRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps,)(ProductPage)