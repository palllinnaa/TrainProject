import { fetchMessage } from './../../redux/actions/action';
import BaseServerContext from "../baseServerContext";
import { createRouter } from 'next-connect';
import { NextApiResponse, NextApiRequest } from 'next';
import { INextApiRequestExtended } from '../interfaces/common';
import 'reflect-metadata';
import { schema, normalize } from "normalizr";
import { fetchFailed, fetchSucceeded, pageFetching } from "../../redux/actions/action";

export default class BaseController extends BaseServerContext {
    private schema: any;

    constructor(opts: any) {
        super(opts);
    }

    protected initSchema(entityName = '', attributes: any = {}) {
        this.schema = entityName ? new schema.Entity(entityName, attributes) : null;
    }

    // private useClassMiddleware(router) {
    //     const classMiddleware = Reflect.getMetadata(
    //         this.constructor.name,
    //         this.constructor
    //     );
    //     const classArgs = Array.isArray(classMiddleware) ? classMiddleware : [];
    //     for (let i = 0; i < classArgs.length; i++) {
    //         router.use(classArgs[i]);
    //     }
    //     return classArgs;
    // }

    private useMethodMiddleware(methodName: string) {
        const key = this.constructor.name + '_' + methodName;
        const methodMiddleware = Reflect.getMetadata(key, this.constructor);
        const methodArgs = Array.isArray(methodMiddleware) ? methodMiddleware : [];
        return methodArgs;
    }

    protected normalizationData(data) {
        return normalize(data, Array.isArray(data) ? [this.schema] : this.schema);
    }

    async pageEntity(params, data, store) {
        if (params.pageName) {
            const { pageName } = params;
            await store.dispatch(pageFetching(true, data, params.entityName, pageName, params?.page, params.perPage, params.totalCount))
            await store.dispatch(pageFetching(false, data, params.entityName, pageName, params?.page, params.perPage, params.totalCount))
        }
    }

    public run = (context, store) =>
        createRouter()
            .get(async (req: INextApiRequestExtended, res: NextApiResponse) => {
                try {
                    const routeName = context.routeName /*|| context.req.url*/ || context.resolvedUrl;
                    const method = "SSR";
                    const members: any = Reflect.getMetadata(routeName, this);
                    const [firstMethod] = members[method];
                    // for (let i = 0; i < members[method].length; i++) {
                    const callback = this[firstMethod].bind(this);
                    let result = await callback({
                        params: context?.params
                    } as any);
                    result.totalCount && (context.params.totalCount = result.totalCount)
                    const { message, messageType } = result;
                    if (result.data) {
                        const normalizedData = this.normalizationData(JSON.parse(JSON.stringify(result.data)));
                        context.params && await this.pageEntity(context.params, normalizedData, store);
                        await store.dispatch(fetchSucceeded(normalizedData));
                        await store.dispatch(fetchMessage({ message: { message, messageType } }));
                    } else {
                        await store.dispatch(fetchMessage({ message: { message, messageType } }));
                    }
                    return {
                        props: {}
                    };
                    // }
                } catch (error: any) {
                    console.error('ERROR in getServerSideProps:', error);
                    store.dispatch(fetchFailed(error))
                    return {
                        props: {},
                    };
                }
            })
            .run(context.req, context.res);

    public handler(routeName: string) {
        const router = createRouter<NextApiRequest, NextApiResponse>();
        // const classArgs = this.useClassMiddleware(router);
        const members: any = Reflect.getMetadata(routeName, this);
        Object.keys(members).map((method) => {
            for (let i = 0; i < members[method].length; i++) {
                const methodName: string = method.toLowerCase();
                if (typeof router[methodName] === 'function') {
                    const methodArgs = this.useMethodMiddleware(members[method][i]);
                    const callback = this[members[method][i]].bind(this);
                    const action = async (req, res, next) => {
                        try {
                            let result = await callback({
                                body: req?.body,
                                params: req?.params,
                                session: req?.session,
                                identity: req?.user,
                                query: req?.query,
                            } as any);
                            return res.status(200).json(
                                {
                                    data: JSON.parse(JSON.stringify(result.data)),
                                    totalCount: result.totalCount,
                                    message: result.message,
                                    messageType: result.messageType
                                }
                            );
                        } catch (err: any) {
                            const message = err?.message ? err.message : err;
                            return res.status(400).json({ message });
                        }
                    }
                    const args = [...methodArgs, action];
                    router[methodName](routeName, ...args)
                }
            }
        })
        return router.handler();
    }
}