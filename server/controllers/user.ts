import { INextApiRequestExtended } from './../interfaces/common';
import type { NextApiRequest } from 'next'
import GET from './decorators/get';
import POST from './decorators/post';
import BaseController from './baseController';

export default class UserController extends BaseController {
    @GET("/user/:id")
    public findUserByIdServerSideProps = async (req: INextApiRequestExtended) => {
        const { UserService } = this.di;
        const id = req.params.id;
        const result = await UserService.findUserById(id)
        const user = JSON.parse(JSON.stringify(result));
        return { props: { user } };
    }

    @GET("/api/user/:id")
    public async findUserById(req: INextApiRequestExtended) {
        const { UserService } = this.di;
        const { params } = req;
        const id = parseInt(params.id as string, 10);
        const result = await UserService.findUserById(id);
        const user = JSON.parse(JSON.stringify(result));
        return user;
    }

    @GET("/users")
    public findAllUsersServerSideProps = async () => {
        const { UserService } = this.di;
        const result = await UserService.findAllUsers();
        const users = JSON.parse(JSON.stringify(result));
        return { props: { users } };
    }

    @GET("/api/users")
    public async findAllUsers() {
        const { UserService } = this.di;
        const result = await UserService.findAllUsers();
        const users = JSON.parse(JSON.stringify(result));
        return users;
    }

    @POST("/api/register")
    public async registerUser(req: NextApiRequest) {
        const { UserService } = this.di;
        const user = await UserService.registerUser(req.body)
        return user;
    }

    @POST("/api/login")
    public loginUser(req: INextApiRequestExtended) {
        if(!req.user) {
            throw new Error("User not Found");
        }
        const user = JSON.parse(JSON.stringify(req.user));
        return { user };
    }
}
