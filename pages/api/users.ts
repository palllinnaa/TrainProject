import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import { passportInitialize, passportSession } from '../../server/middleware/passport';
import Users from '../../server/models/user';

const router = createRouter<NextApiRequest, NextApiResponse>();
router
  .use(passportInitialize)
  .use(passportSession)
  .get(async (req, res) => {
    const result = await Users.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'role']
    });
    const users = JSON.parse(JSON.stringify(result));
    res.status(200).json(users)
  })
export default router.handler({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});