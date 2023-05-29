import BaseController from './baseController';
import type { NextApiRequest } from 'next'
import { INextApiRequestExtended } from './../interfaces/common';
import GET from '../decorators/get';
import POST from '../decorators/post';
import SSR from '../decorators/ssr';
import USE from '../decorators/use';
import session from '../middleware/session';
import { passportAuth, passportInitialize, passportSession } from '../middleware/passport';

// async function testFunc (req, res, next) {
//     console.log('in testFunc');
//     await next();
// }

@USE([session, passportInitialize, passportSession])
export default class UserController extends BaseController {
    @SSR("/user/:id")
    @GET("/api/user/:id")
    public async findUserById(req: INextApiRequestExtended) {
        const { UserService } = this.di;
        const { params } = req;
        const id = parseInt(params.id as string, 10);
        return await UserService.findUserById(id);
    }

    @SSR("/users")
    @GET("/api/users")
    public async findAllUsers() {
        const { UserService } = this.di;
        return await UserService.findAllUsers();
    }

    @POST("/api/register")
    public async registerUser(req: NextApiRequest) {
        const { UserService } = this.di;
        return await UserService.registerUser(req.body);
    }

    @POST("/api/login")
    @USE(passportAuth)
    public async loginUser(req: INextApiRequestExtended) {
        const { identity } = req;
        if (!identity) {
            throw new Error("User not Found");
        }
        return { identity };
    }
}
