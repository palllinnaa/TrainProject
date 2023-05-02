import type { NextApiRequest, NextApiResponse } from 'next'
import Users from '../../../server/models/user';



export default async function userHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    const id = parseInt(query.id as string, 10)

    const result = await Users.findByPk(id);

    // const result = await Users.findAll({ 
    //     where:{id},
    //     include: { all: true, nested: true } 
    // })

    const user = JSON.parse(JSON.stringify(result));

    console.log('API, user =', user);
    res.status(200).json(user)

}

// const handler = nc({
//     onError: (err, req, res, next) => {
//         console.error(err.stsck);
//         res.status(500).end("Something broke!");
//     },
//     onNoMatch: (req, res) => {
//         res.status(404).end("Page is not found");
//       },
// })
// .get(async(req, res) => {
//     const { query } = req
//     const id = parseInt(query.id as string, 10);
//     const result =await Users.findByPk(id);
//     const user = JSON.parse(JSON.stringify(result));
//     res.status(200).json(user)
// })

// export default handler;





//this
// const router = createRouter<NextApiRequest, NextApiResponse>();

// router
//     .get(async (req, res) => {
//         const { query } = req;
//         const id = parseInt(query.id as string, 10);
//         const result = await Users.findByPk(id);
//         const user = JSON.parse(JSON.stringify(result));
//         res.status(200).json(user)
//     })

// create a handler from router with custom
// onError and onNoMatch
// export default router.handler({
//     onError: (err, req, res) => {
//         console.error(err);
//         res.status(500).end("Something broke!");
//     },
//     onNoMatch: (req, res) => {
//         res.status(404).end("Page is not found");
//     },
// });