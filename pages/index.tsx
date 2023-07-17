import React from 'react';
import App from '../components/App';
import { connect } from 'react-redux';
import { IAllProductProps, IState } from '../server/interfaces/common';
import clientContainer from '../redux/container'
import { END } from 'redux-saga';

export const getServerSideProps = clientContainer.resolve('redux')._wrapper.getServerSideProps((store) =>
  async () => {
    const actionToDispatch = () => clientContainer.resolve('ProductSaga').action('fetchProducts');
    await store.dispatch(actionToDispatch());
    store.dispatch(END);
    await store.sagaTask.toPromise()
    return { props: {} }
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