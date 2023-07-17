import '../styles/global.css';
import { ReactNode } from 'react';
import clientContainer from '../redux/container';
import { AppProps } from 'next/app';


const redux = clientContainer.resolve('redux');

const App = (props: AppProps): ReactNode => {
    const { Component, pageProps } = props;
    return <Component {...pageProps} />
    {/* //TODO add ContainerContext.Provider
        <ContainerContext.Provider value={container}>
        </ContainerContext.Provider> */}
}

export default clientContainer.resolve('redux')._wrapper.withRedux(App)