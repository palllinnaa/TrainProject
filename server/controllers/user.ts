import { INextApiRequestExtended } from './../interfaces/common';
import BaseContext from "../baseContext";
import type { NextApiRequest, NextApiResponse } from 'next'

export default class UserController extends BaseContext {
    public findUserByIdServerSideProps = async (req: INextApiRequestExtended) => {
        const { UserService } = this.di;
        const id = req.params.id;
        const result = await UserService.findUserById(id)
        const user = JSON.parse(JSON.stringify(result));
        return { props: { user } };
    }

    public findUserById = async (req: NextApiRequest, res: NextApiResponse) => {
        const { UserService } = this.di;
        const { query } = req;
        const id = parseInt(query.id as string, 10);
        const result = await UserService.findUserById(id);
        const user = JSON.parse(JSON.stringify(result));
        res.status(200).json(user);
    }

    public findAllUsersServerSideProps = async () => {
        const { UserService } = this.di;
        const result = await UserService.findAllUsers();
        const users = JSON.parse(JSON.stringify(result));
        return { props: { users } };
    }

    public findAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
        const { UserService } = this.di;
        const result = await UserService.findAllUsers()
        const users = JSON.parse(JSON.stringify(result));
        res.status(200).json(users)
    }

    public registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
        const { UserService } = this.di;
        const user = await UserService.registerUser(req.body)
        res.status(200).json(user)
    }

    public loginUser = async (req: INextApiRequestExtended, res: NextApiResponse) => {
        const user = JSON.parse(JSON.stringify(req.user));
        res.status(200).json({user})
    }
}
