import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import container from '../../server/container';
import Link from 'next/link';
import ProductDetails from '../../components/products/ProductDetails';
import SiteHeader from '../../components/SiteHeader';

export function getServerSideProps(context) {
  return container.resolve("ProductController").run({ ...context, routeName: "/product/:id" });
}

export default function ProductPage(props) {
  const { query } = useRouter();
  const [data, setData] = useState(props.data || []);

  useEffect(() => {
    if (query?.id) {
      fetch(`/api/product/` + query.id)
        .then(res => res.json())
        .then(json => {
          setData(json);
        })
    }
  }, [query]);
  
  return (
    <div >
      <div className='px-3 font-serif lg:px-4 lg:relative'>
        <SiteHeader />
        <Link href='/'>Home</Link>
        <ProductDetails product={data} />
      </div>
    </div >
  )
}