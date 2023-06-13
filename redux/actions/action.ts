import { IAction } from './../../server/interfaces/common';

export function action(type: string, payload?: any): IAction {
    return { type, payload };
}