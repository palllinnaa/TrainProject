import { Roles } from './../constants';
import { NextApiRequest } from 'next';

export interface INextApiRequestExtended extends NextApiRequest {
    params?: Record<string, any>;
    identity: Record<string, any>;
}

export interface IAllUsersProps {
    receivedUsers: (data: IUser[]) => IUser[];
    data: IUser[];
    users: IUser[];
}

export interface IUserPageProps {
    receivedUserById: (data: IUser) => IUser;
    data: IUser;
    user: IUser;
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
    receivedStores: (data: IStore[]) => IStore[];
    data: IStore[];
    stores: IStore[];
}

export interface IStorePageProps {
    receivedStoreById: (data: IStore[]) => IStore[];
    data: IStore[];
    store: IStore[];
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
    receivedReviews: (data: IReview[]) => IReview[];
    data: IReview[];
    reviews: IReview[];
}

export interface IReviewPageProps {
    receivedReviewById: (data: IReview) => IReview;
    data: IReview;
    review: IReview;
}
export interface IAllReviewsUsersProps {
    receivedReviewsUsers: (data: IReview[]) => IReview[];
    data: IReview[];
    reviewsUsers: IReview[];
}

export interface IReviewsUserPageProps {
    receivedReviewsUsersById: (data: IReview[]) => IReview[];
    data: IReview[];
    reviewsUser: IReview[];
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
    receivedProducts: (data: IProduct[]) => IProduct[];
    data: IProduct[];
    products: IProduct[];
}

export interface IProductPageProps {
    receivedProductById: (data: IProduct) => IProduct;
    data: IProduct;
    product: IProduct;
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
