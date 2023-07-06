import React, { useEffect } from 'react';
import serverContainer from '../server/container';
import App from '../components/App';
import { connect } from 'react-redux';
import { IAllProductProps } from '../server/interfaces/common';
import clientContainer from '../redux/container'

// export async function getServerSideProps(context) {
//   return serverContainer.resolve("ProductController").run(context);
// }

function Home(props: IAllProductProps) {
  const { fetchProducts, data, products } = props;

  useEffect(() => {
    fetchProducts()
  }, []);

  const allProducts = data || products || [];

  return (
    <App data={allProducts} />

  );
}

const mapStateToProps = (state) => ({
  products: state.entitiesReducer.products
});

const mapDispatchToProps = () => {
  const actionToDispatch = () => clientContainer.resolve('ProductSaga').action('fetchProducts');
  return {
      fetchProducts: () => clientContainer.resolve('redux').dispatch(actionToDispatch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)