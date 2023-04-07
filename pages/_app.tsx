import '../styles/global.css';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';


// export default function App({Component, pageProps}:AppProps) {
//     return <Component {...pageProps}/>;
// }
const App = (props: AppProps): ReactNode => {
    const {Component, pageProps} = props;
    return <Component {...pageProps}/>;
}

export default App;