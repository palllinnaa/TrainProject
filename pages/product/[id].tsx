import { useRouter } from 'next/router'
import { useEffect } from 'react';
import container from '../../server/container';
import Link from 'next/link';
import ProductDetails from '../../components/products/ProductDetails';
import SiteHeader from '../../components/SiteHeader';
import { connect } from 'react-redux';
import { receivedProductById } from '../../redux/actions/product';
import { IProductPageProps } from '../../server/interfaces/common';
import { entity } from '../../server/constants';

export function getServerSideProps(context) {
  return container.resolve("ProductController").run({ ...context, routeName: "/product/:id" });
}

function ProductPage(props: IProductPageProps) {
  const { query } = useRouter();
  const { receivedProductById, data, product } = props;
  const url = `product/${query.id}`;
  
    useEffect(() => {
        if (query?.id) {
            entity.readData(url)
                .then(result => {
                    receivedProductById(result);
                })
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
      receivedProductById: (product) => dispatch(receivedProductById(product))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductPage)