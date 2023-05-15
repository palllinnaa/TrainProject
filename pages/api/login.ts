import { passportInitialize, passportSession } from './../../server/middleware/passport';
import type { NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import { passportAuth } from '../../server/middleware/passport';
import session from '../../server/middleware/session';
import { INextApiRequestExtended } from '../../server/interfaces/common'
const slug = require('slug')

const router = createRouter<INextApiRequestExtended, NextApiResponse>();
router
    .use(session)
    .use(passportInitialize)
    .use(passportSession)
    .use(passportAuth)
    .post((req, res) => {
        console.log('here---------------', req.user);
        const user = JSON.parse(JSON.stringify(req.user));
        res.status(200).json({user})
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