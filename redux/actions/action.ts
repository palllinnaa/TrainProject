import { IAction } from './../../server/interfaces/common';

export function action(type: string, payload?: any): IAction {
    return { type, payload };
}

export const fetchSucceeded = (data) => action('FETCH_SUCCEEDED', data);
export const fetchFailed = (error) => action('FETCH_FAILED', error);