import React from 'react';
import App from '../components/App';
import { connect } from 'react-redux';
import { IAllProductProps, IState } from '../server/interfaces/common';
import clientContainer from '../redux/container'
import serverContainer from '../server/container';

export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
    async (context) => {
        return serverContainer.resolve("ProductController").run(context, store);
    }
);

function Home(props: IAllProductProps) {
  const { products } = props;

  return (
    <App data={products} />
  );
}

const mapStateToProps = (state: IState) => ({
  products: state.entitiesReducer.products || []
});

export default connect(mapStateToProps)(Home)