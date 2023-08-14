import { IAction, IPaginationFilter } from './../../server/interfaces/common';

export function action(type: string, payload?: any): IAction {
    return { type, payload };
}

export const fetchSucceeded = (data) => action('FETCH_SUCCEEDED', data);
export const fetchMessage = (data) => action('FETCH_MESSAGE', data);
export const fetchFailed = (error) => action('FETCH_FAILED', error);

export const pageFetching = (
    isFetching: boolean,
    data: any,
    entityName: string,
    pageName: string,
    page: number,
    perPage: number,
    totalCount?: number,
    filter?: any,
) => action('PAGE_FETCHING', { isFetching, data, entityName, pageName, page, perPage, totalCount, filter });

export const changePaginationParams = (
    pageName: string,
    page: number,
    perPage: number,
    filter: IPaginationFilter
) => action('CHANGE_PAGINATION_PARAMS', { pageName, page, perPage, filter });