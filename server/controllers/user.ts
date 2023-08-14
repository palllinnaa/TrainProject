import BaseController from './baseController';
import { INextApiRequestExtended } from './../interfaces/common';
import GET from '../decorators/get';
import SSR from '../decorators/ssr';
import USE from '../decorators/use';
import session from '../middleware/session';
import { passportInitialize, passportSession } from '../middleware/passport';
import { schema } from 'normalizr';
import POST from '../decorators/post';

@USE([session, passportInitialize, passportSession])
export default class UserController extends BaseController {
    constructor(opts: any) {
        super(opts);
        this.initSchema('users', {
            store: [new schema.Entity('stores')],
            review: [new schema.Entity('reviews')]
        });
    }

    @SSR("/user/:id")
    @GET("/api/user/:id")
    public async findUserById(req: INextApiRequestExtended) {
        const { UserService } = this.di;
        const { params } = req;
        const id = parseInt(params.id as string, 10);
        return await UserService.findUserById(id);
    }

    @POST("/api/users")
    @SSR("/users")
    @GET("/api/users")
    public async findAllUsers(req: INextApiRequestExtended) {
        const { UserService } = this.di;
        const { params, query, body } = req;
        return await UserService.findAllUsersPagination(
            Number(params.page || query.page),
            Number(params.perPage || query.limit),
            body?.filter || undefined
        );
    }
}
