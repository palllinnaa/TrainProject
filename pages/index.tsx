import React from 'react';
import App from '../components/App';
import { connect } from 'react-redux';
import { IAllProductProps, IState } from '../server/interfaces/common';
import clientContainer from '../redux/container'
import { runControllers } from '../src/utils';
import { showMessage } from '../components/Toast';

export const getServerSideProps =
    clientContainer.resolve('redux').getServerSideProps(runControllers("ProductController")
    );

function Home(props: IAllProductProps) {
  const { products, message, messageType } = props;
  showMessage(message, messageType);

  return (
    <App data={products} />
  );
}

const mapStateToProps = (state: IState) => ({
  products: state.entitiesReducer.products || [],
  message: state.entitiesReducer.responseMessage.message,
  messageType: state.entitiesReducer.responseMessage.messageType
});

export default connect(mapStateToProps)(Home)