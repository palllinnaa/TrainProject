import '../styles/global.css';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';
import store from '../redux/store';
import { Provider } from 'react-redux';

const App = (props: AppProps): ReactNode => {
    const { Component, pageProps } = props;
    return <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
}

export default App;