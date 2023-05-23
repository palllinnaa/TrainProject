import { passportInitialize, passportSession } from './../../server/middleware/passport';
import type { NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import { passportAuth } from '../../server/middleware/passport';
import session from '../../server/middleware/session';
import { INextApiRequestExtended } from '../../server/interfaces/common'
import container from '../../server/container';

const userController = container.resolve("UserController");
const router = createRouter<INextApiRequestExtended, NextApiResponse>();
router
    .use(session)
    .use(passportInitialize)
    .use(passportSession)
    .use(passportAuth)
    .post(userController.loginUser);

export default router.handler({
    onError: (err, req, res) => {
        console.error(err);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
});