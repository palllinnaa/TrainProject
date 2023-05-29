import BaseContext from "../baseContext";
import { createRouter } from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';
import { INextApiRequestExtended } from '../interfaces/common';
import 'reflect-metadata';

export default class BaseController extends BaseContext {
    public run = (context) =>
        createRouter()
            .get(async (req: INextApiRequestExtended, res: NextApiResponse) => {
                try {
                    const routeName = context.routeName || context.req.url;
                    const method = "SSR";
                    const members: any = Reflect.getMetadata(routeName, this);
                    const [firstMethod] = members[method];
                    // for (let i = 0; i < members[method].length; i++) {
                    const callback = this[firstMethod].bind(this);
                    let data = await callback({
                        params: context?.params,
                    } as any);
                    data = JSON.parse(JSON.stringify(data));
                    return {
                        props: { data },
                    };
                    // }
                } catch (error: any) {
                    console.error('ERROR in getServerSideProps:', error);
                    return {
                        props: { message: error },
                    };
                }
            })
            .run(context.req, context.res);

    public handler(routeName: string) {
        const router = createRouter<NextApiRequest, NextApiResponse>();
        const members: any = Reflect.getMetadata(routeName, this);
        Object.keys(members).map((method) => {
            const [firstMethod] = members[method];
            // for (let i = 0; i < members[method].length; i++) {
            const methodName: string = method.toLowerCase();
            if (typeof router[methodName] === 'function') {
                const callback = this[firstMethod].bind(this);
                const action = async (req, res, next) => {
                    try {
                        let data = await callback({
                            body: req?.body,
                            params: req?.params,
                            session: req?.session,
                        } as any);
                        data = JSON.parse(JSON.stringify(data));
                        return res.status(200).json(data);
                    } catch (err: any) {
                        const message = err?.message ? err.message : err;
                        return res.status(400).json({ message });
                    }
                }
                router[methodName](routeName, action)
            }
            // }
        })
        return router.handler();
    }
}