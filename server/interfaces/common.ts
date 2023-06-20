import { Roles } from './../constants';
import { NextApiRequest } from 'next';

export interface INextApiRequestExtended extends NextApiRequest {
    params?: Record<string, any>;
    identity: Record<string, any>;
}

export interface IAllUsersProps {
    usersRequest: () => void;
    data: IUser[];
    users: IUser;
}

export interface IUserPageProps {
    userByIdRequest: (data: any) => void;
    data: IUser;
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
    storesRequest: () => void;
    data: IStore[];
    stores: IStore;
    users?: IUser;
}

export interface IStorePageProps {
    storeByIdRequest: (data: any) => void;
    data: IStore;
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
    reviewsRequest: () => void;
    data: IReview[];
    reviews: IReview;
}

export interface IReviewPageProps {
    reviewByIdRequest: (data: any) => void;
    data: IReview;
}
export interface IAllReviewsUsersProps {
    reviewsUsersRequest: () => void;
    data: IReview[];
    reviewsUsers: IReview;
    users?: IUser;
    stores?: IStore;
}

export interface IReviewsUserPageProps {
    reviewsUserByIdRequest: (data: any) => void;
    data: IReview;
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
    productsRequest: () => void;
    data: IProduct[];
    products: IProduct;
}

export interface IProductPageProps {
    productByIdRequest: (data: any) => void;
    data: IProduct;
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
    loginUserRequest: (data: any) => void;
    clearReducerError: () => void;
    identity: IUser;
    error: string;
}

export interface IRegisterFormPageProps {
    registerUserRequest: (data: any) => void;
    clearReducerError: () => void;
    identity: IUser;
    error: string;
}

export interface IAction {
    type: string;
    payload?: any;
}

export interface IState {
    reducer: IStateData
}

export interface IStateData {
    users?: IUser;
    identity?: IUser,
    stores?: IStore;
    reviews?: IReview;
    products?: IProduct;
    error?: string;
}