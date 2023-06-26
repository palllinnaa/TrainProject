import { action } from "./action";

export const productsRequest = () => action('PRODUCTS_REQUEST');
export const productByIdRequest = (id) => action('PRODUCT_BY_ID_REQUEST', id);