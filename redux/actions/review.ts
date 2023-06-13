import { action } from "./action";

export const reviewsRequest = () => action('REVIEWS_REQUEST');
export const reviewsFetchSucceeded = (reviews) => action('REVIEWS_FETCH_SUCCEEDED', reviews);
export const reviewsFetchFailed = (error) => action('REVIEWS_FETCH_FAILED', error);
export const reviewByIdRequest = (id) => action('REVIEW_BY_ID_REQUEST', id);
export const reviewByIdFetchSucceeded = (review) => action('REVIEW_BY_ID_FETCH_SUCCEEDED', review);
export const reviewByIdFetchFailed = (error) => action('REVIEW_BY_ID_FETCH_FAILED', error);
export const reviewsUsersRequest = () => action('REVIEWS_USERS_REQUEST');
export const reviewsUsersFetchSucceeded = (reviewsUsers) => action('REVIEWS_USERS_FETCH_SUCCEEDED', reviewsUsers);
export const reviewsUsersFetchFailed = (error) => action('REVIEWS_USERS_FETCH_FAILED', error);
export const reviewsUserByIdRequest = (id) => action('REVIEWS_USER_BY_ID_REQUEST', id);
export const reviewsUserByIdFetchSucceeded = (reviewsUser) => action('REVIEWS_USER_BY_ID_FETCH_SUCCEEDED', reviewsUser);
export const reviewsUserByIdFetchFailed = (error) => action('REVIEWS_USER_BY_ID_FETCH_FAILED', error);