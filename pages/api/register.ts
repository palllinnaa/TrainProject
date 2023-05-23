import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import container from '../../server/container';

const userController = container.resolve("UserController");
const router = createRouter<NextApiRequest, NextApiResponse>();
router
  .post(userController.registerUser)

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