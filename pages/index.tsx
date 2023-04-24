import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import App from '../components/App';
import { products } from './api/products';

export async function getServerSideProps() {
    console.log('SSR, products = ', products)
    return {
      props: {
        data: products
      }
    }
  }


  

function StartTailwind(props) {
    
    const { query } = useRouter();
    const [data, setData] = useState(props.data);
  
    useEffect(() => {
      console.log('fetch the products');
      fetch(`/api/products`)
        .then(res => res.json())
        .then(json => {
          setData(json);
          console.log('client, products = ', json)
        })
    }, []);

    //const { data } = props;
    return (
        <App data={data}  />
    );
}

export default StartTailwind;