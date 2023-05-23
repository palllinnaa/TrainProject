import { NextApiRequest } from 'next';
import { IUserModel } from './users';

export interface INextApiRequestExtended extends NextApiRequest {
    user?: IUserModel;
    params?: Record<string, any>;
}