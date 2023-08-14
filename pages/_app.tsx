import '../styles/global.css';
import { ReactNode } from 'react';
import clientContainer from '../redux/container';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const redux = clientContainer.resolve('redux');

const App = (props: AppProps): ReactNode => {
    const { Component, pageProps } = props;
    {/* //TODO add ContainerContext.Provider
        <ContainerContext.Provider value={container}>
        </ContainerContext.Provider> */}
    return (
        <>
            <Component {...pageProps} />
            <ToastContainer />
        </>
    )
}

export default clientContainer.resolve('redux')._wrapper.withRedux(App)