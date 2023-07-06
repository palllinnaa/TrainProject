import '../styles/global.css';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import clientContainer from '../redux/container';

const redux = clientContainer.resolve('redux');

const App = (props: AppProps): ReactNode => {
    const { Component, pageProps } = props;
    return <Provider store={redux.store} >
        <Component {...pageProps} />
        {/* //TODO add ContainerContext.Provider
        <ContainerContext.Provider value={container}>
        </ContainerContext.Provider> */}
    </Provider>
}

export default App;