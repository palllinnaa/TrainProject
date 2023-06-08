import { useRouter } from 'next/router'
import { useEffect } from 'react';
import container from '../../server/container';
import Link from 'next/link';
import ProductDetails from '../../components/products/ProductDetails';
import SiteHeader from '../../components/SiteHeader';
import { connect } from 'react-redux';
import { productByIdRequest } from '../../redux/actions/product';
import { IProductPageProps } from '../../server/interfaces/common';

export function getServerSideProps(context) {
  return container.resolve("ProductController").run({ ...context, routeName: "/product/:id" });
}

function ProductPage(props: IProductPageProps) {
  const { query } = useRouter();
  const { productByIdRequest, data, product } = props;
  const url = `product/${query.id}`;

  useEffect(() => {
    if (query?.id) {
      productByIdRequest(query.id)
    }
  }, [query]);

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

const mapStateToProps = (state) => ({
  product: state.productReducer.product
});

const mapDispatchToProps = (dispatch) => {
  return {
    productByIdRequest: (id) => dispatch(productByIdRequest(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductPage)