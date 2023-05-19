import { createRouter } from 'next-connect';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import App from '../components/App';
import container from '../server/container';

const router = createRouter()
  .get(async (req, res) => {
    const result = await container.resolve("ProductService").findAllProducts()
    const data = JSON.parse(JSON.stringify(result));
    const products = data.map((item) => ({
      ...item,
      property: item.property.split(";"),
    }));
    return { props: { data: products } };
  })

export async function getServerSideProps({ req, res }) {
  return router.run(req, res);
}

export default function StartTailwind(props) {
  const { query } = useRouter();
  const [data, setData] = useState(props.data || []);
  useEffect(() => {
  fetch(`/api/products`)
    .then(res => res.json())
    .then(json => {
      setData(json);
    })
  }, [query]);

  return (
    <App data={data} />
  );
}