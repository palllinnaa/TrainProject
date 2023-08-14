import { Roles } from './../constants';
import { NextApiRequest } from 'next';
import { ReactNode } from 'react';

export interface INextApiRequestExtended extends NextApiRequest {
    params?: Record<string, any>;
    identity: Record<string, any>;
}

export interface IResult {
    data?: any;
    totalCount?: any;
    message?: string;
    messageType?: string;
}

export interface IAllUsersProps {
    users: IUser;
    pagination?: IPaginator;
    message: string;
    messageType: string;
    fetchUsers?: (data: any) => void;
}

export interface IUserPageProps {
    message: string;
    messageType: string;
    pagination?: IPaginator;
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: Roles;
    slug: string;
}

export interface IAllStoresProps {
    stores: IStore;
    users?: IUser;
    pagination?: IPaginator;
    message: string;
    messageType: string;
    fetchStores?: (data: any) => void;
}

export interface IStorePageProps {
    message: string;
    messageType: string;
    pagination?: IPaginator;
}

export interface IStore {
    id: number;
    storeName: string;
    userId: number;
    user?: IUser;
    reviewCount?: number;
    rating?: string;
}

export interface IAllReviewsProps {
    reviews: IReview;
    message: string;
    messageType: string;
}

export interface IReviewPageProps {
    message: string;
    messageType: string;
}

export interface IAllReviewsUsersProps {
    reviewsUsers: IReview;
    users?: IUser;
    stores?: IStore;
    message: string;
    messageType: string;
}

export interface IReviewsUserPageProps {
    message: string;
    messageType: string;
}

export interface IReview {
    id: number;
    reviewText: string;
    rating: number;
    storeId: number;
    userId: number;
    reviewCount?: number;
    user?: IUser;
    store?: IStore;
}

export interface IAllProductProps {
    products: IProduct;
    message: string;
    messageType: string;
}

export interface IProductPageProps {
    message: string;
    messageType: string;
}

export interface IProduct {
    id: number;
    productName: string;
    image: string;
    property: string;
    price: number;
    description: string;
    ingredients: string;
    storeId: number;
}

export interface ILoginFormPageProps {
    fetchLoginUser: (data: any) => void;
    clearReducerError: () => void;
    clearReducerMessage: () => void;
    identity: IUser;
    error: string;
    message?: string;
    messageType?: string;
}

export interface IRegisterFormPageProps {
    fetchRegisterUser: (data: any) => void;
    clearReducerError: () => void;
    clearReducerMessage: () => void;
    identity: IUser;
    error: string;
    message?: string;
    messageType?: string;
}

export interface IAction {
    type: string;
    payload?: any;
}

export interface IState {
    entitiesReducer: IStateEntityData;
    authReducer: IStateAuthData;
    pagination: IStatePaginatorData;
}

export interface IStateEntityData {
    users?: IUser;
    stores?: IStore;
    reviews?: IReview;
    products?: IProduct;
    error?: string;
    responseMessage?: {
        message: string;
        messageType: string;
    }
}

export interface IStatePaginatorData {
    users?: IPaginator;
    stores?: IPaginator;
    reviews?: IPaginator;
    products?: IPaginator;
}

export interface IPaginator {
    pageName: string;
    pages: IPaginationPage
    fetching: boolean;
    currentPage: number;
    perPage: number;
    totalCount: number;
    filter: IPaginationFilter;

}

export interface IPaginationFilter {
    columnName: string;
    columnLabel: string;
    action: string;
    value: string;
}

export interface IPaginationParams {
    entityName: string;
    pageName: string;
    fetching?: boolean;
    page?: number;
    perPage?: number;
    totalCount?: number;
    filter?: IPaginationFilter;
}

interface IPaginationPage {
    pages: Record<number, any>;
}

export interface IStateAuthData {
    identity?: IUser;
    error?: string;
    responseMessage?: {
        message: string;
        messageType: string;
    }
}

export interface ISagaMethods {
    className: string;
    methodName: string;
}

export interface ITableColumn {
    key: string;
    label: string;
    type?: string;
    linkRout?: string;
    filter?: {
      sortingFilter?: boolean;
      comparativeFilter?: boolean;
      values?: string[];
      filterActions?: Record<string, string>;
    }
    render?: (data: any) => ReactNode;
}