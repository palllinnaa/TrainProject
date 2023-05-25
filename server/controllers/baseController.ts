import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import { createRouter } from 'next-connect';
import BaseContext from "../baseContext";
import 'reflect-metadata';

export default class BaseController extends BaseContext {
    public handler(routeName: string) {
        const router = createRouter<NextApiRequest, NextApiResponse>();
        const members: any = Reflect.getMetadata(routeName, this);
        Object.keys(members).map((method) => {
            for (let i = 0; i < members[method].length; i++) {
                const methodName: string = method.toLowerCase();
                if (typeof router[methodName] === 'function') {
                    const callback = this[members[method][i]].bind(this);
                    const action = async (req, res, next) => {
                        try {
                            const data = await callback({
                                body: req?.body,
                                params: req?.params,
                                session: req?.session,
                            } as any);
                            return res.status(200).json(data);
                        } catch (err: any) {
                            const message = err?.message ? err.message : err;
                            return res.status(400).json({ message });
                        }
                    }
                    router[methodName](routeName, action)
                }
            }
        })
        return router.handler();
    }
}