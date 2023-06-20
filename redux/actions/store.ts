import { action } from "./action";

export const storesRequest = () => action('STORES_REQUEST');
export const storeByIdRequest = (id) => action('STORE_BY_ID_REQUEST', id);