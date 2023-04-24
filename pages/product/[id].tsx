//import type { Product } from '../../src/interfaces';
import { useRouter } from 'next/router'
import { products } from '../api/products';
import { useEffect, useState } from 'react';
import ProductDetails from '../../components/products/ProductDetails';
import SiteHeader from '../../components/SiteHeader-new';

//const fetcher = (url: string) => fetch(url).then((res) => res.json())

export async function getServerSideProps({ query }) {
  const id = query.id;
  const product = products.find(p => p.id == id);
  console.log('SSR, product = ', product)
  return {
    props: {
      data: product
    }
  }
}

export default function ProductPage(props) {
  const { query } = useRouter();
  const [data, setData] = useState(props.data);

  useEffect(() => {
    console.log('fetch the product = ' + query.id);
    fetch(`/api/product/` + query.id)
      .then(res => res.json())
      .then(json => {
        setData(json);
        console.log('client, product = ', json)
      })
  }, []);

  return (
    <div >
      <div className='px-3 font-serif lg:px-4 lg:relative'>
        <SiteHeader/>
        <ProductDetails product={data} />
      </div>
    </div >
  )

}