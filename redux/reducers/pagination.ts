import { IStatePaginatorData } from "../../server/interfaces/common";

export default function pagination(state: IStatePaginatorData, action: any) {
    if (action.payload) {
        const { pageName, data, entityName, perPage, page, filter } = action.payload;
        if (pageName && data) {
            let pagination = state[pageName] ? state[pageName] : [];
            let pages = pagination.pages ? pagination.pages : {};

            if (action.payload.totalCount && action.payload.totalCount !== 0) {
                pagination = {
                    ...pagination,
                    totalCount: action.payload.totalCount
                }
            }

            if (data.result) {
                pages = {
                    ...pages,
                    [page]: data.result
                }
            }

            if (filter) {
                pagination = {
                    ...pagination,
                    filter: {
                        columnName: filter.columnName,
                        columnLabel: filter.columnLabel,
                        action: filter.action,
                        value: filter.value
                    }
                }
            }

            pagination = {
                ...pagination,
                pageName: action.payload.pageName,
                currentPage: page,
                perPage: perPage,
                pages: pages,
                entityName: entityName
            }

            state = {
                ...state,
                [pageName]: pagination
            }
        }
    }
    switch (action.type) {
        case 'PAGE_FETCHING': {
            const { pageName, page, isFetching } = action.payload;
            let pagination = state[pageName] || [];

            pagination = {
                ...pagination,
                fetching: isFetching
            }

            if (pagination.pages[page]) {
                pagination = {
                    ...pagination,
                    currentPage: page
                }
            }

            state = {
                ...state,
                [pageName]: pagination
            }
        }
            break;
        case 'CHANGE_PAGINATION_PARAMS': {
            const { pageName, page, perPage, filter } = action.payload;
            let pagination = state[pageName] || [];

            pagination = {
                ...pagination,
                currentPage: page && page,
                perPage: perPage && perPage,
                filter: filter && {
                    columnName: filter.columnName,
                    columnLabel: filter.columnLabel,
                    action: filter.action,
                    value: filter.value
                }
            }

            state = {
                ...state,
                [pageName]: pagination
            }
        }
    }
    return { ...state };

} 