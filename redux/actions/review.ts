import { action } from "./action";

export const reviewsRequest = () => action('REVIEWS_REQUEST');
export const reviewByIdRequest = (id) => action('REVIEW_BY_ID_REQUEST', id);
export const reviewsUsersRequest = () => action('REVIEWS_USERS_REQUEST');
export const reviewsUserByIdRequest = (id) => action('REVIEWS_USER_BY_ID_REQUEST', id);