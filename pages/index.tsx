import React, { useEffect } from 'react';
import container from '../server/container';
import App from '../components/App';
import { productsRequest } from '../redux/actions/product';
import { connect } from 'react-redux';
import { IAllProductProps } from '../server/interfaces/common';

// export async function getServerSideProps(context) {
//   return container.resolve("ProductController").run(context);
// }

function Home(props: IAllProductProps) {
  const { productsRequest, data, products } = props;

  useEffect(() => {
    productsRequest()
  }, []);

  const allProducts = data || products || [];

  return (
    <App data={allProducts} />

  );
}

const mapStateToProps = (state) => ({
  products: state.reducer.products
});

const mapDispatchToProps = (dispatch) => {
  return {
    productsRequest: () => dispatch(productsRequest())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)