import React, { useEffect } from 'react';
import container from '../server/container';
import App from '../components/App';
import { receivedProducts } from '../redux/actions/product';
import { connect } from 'react-redux';
import { IAllProductProps } from '../server/interfaces/common';

export async function getServerSideProps(context) {
  return container.resolve("ProductController").run(context);
}

function Home(props: IAllProductProps) {
  const { receivedProducts, data, products } = props;

  useEffect(() => {
    fetch(`/api/products`)
      .then(res => res.json())
      .then(json => {
        receivedProducts(json);
      })
  }, []);

  const allProducts = data || products || [];

  return (
    <App data={allProducts} />

  );
}

const mapStateToProps = (state) => ({
  products: state.productReducer.products
});

const mapDispatchToProps = (dispatch) => {
  return {
    receivedProducts: (products) => dispatch(receivedProducts(products))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)