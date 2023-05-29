import { NextApiRequest } from 'next';
import { IUserModel } from './users';

export interface INextApiRequestExtended extends NextApiRequest {
    params?: Record<string, any>;
    identity: Record<string, any>;
}