import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import Users from '../../server/models/user';

// export default async function handler(
//     _req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const result = await Users.findAll({
//         attributes: ['id', 'name', 'email', 'role']
//     });

//     // const result = await Users.findAll({ include: { all: true, nested: true } })

//     // const result = await Users.findAll({ include: { all: true }})
//     const users = JSON.parse(JSON.stringify(result));

//     res.status(200).json(users)
// }



const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (req, res) => {
    const result = await Users.findAll({
      attributes: ['id', 'name', 'email', 'role']
    });
    const users = JSON.parse(JSON.stringify(result));
    res.status(200).json(users)
  })

// create a handler from router with custom
// onError and onNoMatch
export default router.handler({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});


//not this
// import nc from "next-connect";

// const handler = nc({
//   onError: (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).end("Something broke!");
//   },
//   onNoMatch: (req, res) => {
//     res.status(404).end("Page is not found");
//   },
// })
//   .get(async (req, res) => {
//     const result = await Users.findAll({
//         attributes: ['id', 'name', 'email', 'role']
//     });
//     const users = JSON.parse(JSON.stringify(result));
//     res.status(200).json(users)
//   })

// export default handler;