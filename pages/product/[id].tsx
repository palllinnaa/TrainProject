import { createRouter } from 'next-connect';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import ProductDetails from '../../components/products/ProductDetails';
import SiteHeader from '../../components/SiteHeader';
import Products from '../../server/models/product';

const router = createRouter()
  .get("product/:id", async (req: any) => {
    const id = req.params.id;
    const res = await Products.findByPk(id)
    let product = JSON.parse(JSON.stringify(res));
    product = {
      ...product,
      property: product.property.split(";"),
      ingredients: product.ingredients.split(";")
    }
    return { props: { data: product } };
  })

export async function getServerSideProps({ req, res }) {
  return router.run(req, res);
}

export default function ProductPage(props) {
  const { query } = useRouter();
  const [data, setData] = useState(props.data || []);
  // useEffect(() => {
  //   fetch(`/api/product/` + query.id)
  //     .then(res => res.json())
  //     .then(json => {
  //       setData(json);
  //     })
  // }, []);

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