import BaseController from './baseController';
import { INextApiRequestExtended } from './../interfaces/common';
import GET from '../decorators/get';
import SSR from '../decorators/ssr';

export default class StoreController extends BaseController {
    @SSR("/store/:id")
    @GET("/api/store/:id")
    public async findStoreById(req: INextApiRequestExtended) {
        const { StoreService } = this.di;
        const { params } = req;
        const id = parseInt(params.id as string, 10);
        return await StoreService.findStoreOwnerReviews(id);
    }

    @SSR("/stores")
    @GET("/api/stores")
    public async findAllStores() {
        const { StoreService } = this.di;
        return await StoreService.findStoresOwnerReviews();
    }
}
