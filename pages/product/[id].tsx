import { createRouter } from 'next-connect';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import ProductDetails from '../../components/products/ProductDetails';
import SiteHeader from '../../components/SiteHeader';
import container from '../../server/container';

const productController = container.resolve("ProductController");
const router = createRouter()
  .get(productController.findProductByIdServerSideProps)

export async function getServerSideProps(context) {
  return router.run({ ...context.req, params: context.params }, context.res);
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