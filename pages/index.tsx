import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import App from '../components/App';
import Products from '../server/models/product';

export async function getServerSideProps() {
  // const res = await db.sequelize.query("SELECT * FROM Products");
  const res = await Products.findAll({
    attributes: ['id', 'productName', 'image', 'property', 'price', 'description']
  });
  const data = JSON.parse(JSON.stringify(res));

   const products = data.map((item) => ({
     ...item,
     property: item.property.split(";"),
  //   ingredients: item.ingredients.split(";")
  }));
  console.log(' Products', products);
  return {
    props: {
      data: products 
    }
  }
}

function StartTailwind(props) {

  // console.log('process.env.DB_USER----------------------', process.env.DB_USER);
  // console.log('process.env.DB_PSWD----------------------', process.env.DB_PSWD);
  // console.log('process.env.DB_NAME----------------------', process.env.DB_NAME);
  // console.log('process.env.DB_HOST----------------------', process.env.DB_HOST);
  // console.log('process.env.DB_PORT----------------------', process.env.DB_PORT);

  const { query } = useRouter();
  const [data, setData] = useState(props.data || []);

  // useEffect(() => {
    // console.log('fetch the products');
    // fetch(`/api/products`)
    //   .then(res => res.json())
    //   .then(json => {
    //     setData(json);
    //     console.log('client products = ', json)
    //   })
  // }, []);

  //const { data } = props;
  return (
    <App data={data} />
  );
}

export default StartTailwind;