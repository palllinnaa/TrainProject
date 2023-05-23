import { createRouter } from 'next-connect';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import App from '../components/App';
import container from '../server/container';

const productController = container.resolve("ProductController");
const router = createRouter()
  .get(productController.findAllProductsServerSideProps)

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