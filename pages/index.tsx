import React, { useEffect, useState } from 'react';
import container from '../server/container';
import App from '../components/App';

export async function getServerSideProps(context) {
  return container.resolve("ProductController").run(context);
}

export default function StartTailwind(props) {
  const [data, setData] = useState(props.data || []);

  useEffect(() => {
    fetch(`/api/products`)
      .then(res => res.json())
      .then(json => {
        setData(json);
      })
  }, []);

  return (
    <App data={data} />
  );
}