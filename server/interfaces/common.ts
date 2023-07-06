import { Roles } from './../constants';
import { NextApiRequest } from 'next';

export interface INextApiRequestExtended extends NextApiRequest {
    params?: Record<string, any>;
    identity: Record<string, any>;
}

export interface IAllUsersProps {
    fetchUsers:  () => void;
    data: IUser[];
    users: IUser;
}

export interface IUserPageProps {
    fetchUserById: (data: any) => void;
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
    fetchStores: () => void;
    data: IStore[];
    stores: IStore;
    users?: IUser;
}

export interface IStorePageProps {
    fetchStoreById: (data: any) => void;
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
    fetchReviews: () => void;
    data: IReview[];
    reviews: IReview;
}

export interface IReviewPageProps {
    fetchReviewById: (data: any) => void;
    data: IReview;
}
export interface IAllReviewsUsersProps {
    fetchReviewsUsers: () => void;
    data: IReview[];
    reviewsUsers: IReview;
    users?: IUser;
    stores?: IStore;
}

export interface IReviewsUserPageProps {
    fetchReviewsUserById: (data: any) => void;
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
    fetchProducts: () => void;
    data: IProduct[];
    products: IProduct;
}

export interface IProductPageProps {
    fetchProductById: (data: any) => void;
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
    fetchLoginUser: (data: any) => void;
    clearReducerError: () => void;
    identity: IUser;
    error: string;
}

export interface IRegisterFormPageProps {
    fetchRegisterUser: (data: any) => void;
    clearReducerError: () => void;
    identity: IUser;
    error: string;
}

export interface IAction {
    type: string;
    payload?: any;
}

export interface IState {
    entitiesReducer: IStateEntityData;
    authReducer: IStateAuthData
}

export interface IStateEntityData {
    users?: IUser;
    stores?: IStore;
    reviews?: IReview;
    products?: IProduct;
    error?: string;
}

export interface IStateAuthData {
    identity?: IUser,
    error?: string;
}

export interface ISagaMethods {
    className: string;
    methodName: string;
}