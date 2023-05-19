import { createRouter } from 'next-connect';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import ProductDetails from '../../components/products/ProductDetails';
import SiteHeader from '../../components/SiteHeader';
import container from '../../server/container';

const router = createRouter()
  .get("product/:id", async (req: any) => {
    const id = req.params.id;
    const result = await container.resolve("ProductService").findProductById(id);
    let product = JSON.parse(JSON.stringify(result));
    product = {
      ...product,
      property: product.property.split(";"),
      ingredients: product.ingredients.split(";")
    }
    return { props: { data: product } };
  })
  .all(() => {
    console.log("----------------------------------------------all----------------------------------------------")
    return { props: {} };
  });

export async function getServerSideProps({ req, res }) {
  return router.run(req, res);
}

export default function ProductPage(props) {
  const { query } = useRouter();
  const [data, setData] = useState(props.data || []);
  useEffect(() => {
    fetch(`/api/product/` + query.id)
      .then(res => res.json())
      .then(json => {
        setData(json);
      })
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