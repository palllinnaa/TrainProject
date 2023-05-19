import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';

import container from '../../server/container';
const slug = require('slug')

const router = createRouter<NextApiRequest, NextApiResponse>();
router
  .post(async (req, res) => {
    // TODO send req.body
    const user = await container.resolve("UserService").registerUser(req.body)
    res.status(200).json(user)
  })

export async function registerUser({ req, res }) {
  return router.run(req, res);
}

export default router.handler({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});