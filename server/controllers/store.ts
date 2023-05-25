import { INextApiRequestExtended } from './../interfaces/common';
import BaseController from './baseController';
import GET from '../decorators/get';

export default class StoreController extends BaseController {
    @GET("/store/:id")
    public findStoreByIdServerSideProps = async (req: INextApiRequestExtended) => {
        const { StoreService } = this.di;
        const id = req.params.id;
        const result = await StoreService.findStoreOwnerReviews(id)
        const store = JSON.parse(JSON.stringify(result));
        return { props: { store } };
    }

    @GET("/api/store/:id")
    public async findStoreById(req: INextApiRequestExtended) {
        const { StoreService } = this.di;
        const { params } = req;
        const id = parseInt(params.id as string, 10);
        const result = await StoreService.findStoreOwnerReviews(id)
        const store = JSON.parse(JSON.stringify(result));
        return store;
    }

    @GET("/stores")
    public findAllStoresServerSideProps = async () => {
        const { StoreService } = this.di;
        const result = await StoreService.findStoresOwnerReviews()
        const stores = JSON.parse(JSON.stringify(result));
        return { props: { stores } };
    }

    @GET("/api/stores")
    public async findAllStores() {
        const { StoreService } = this.di;
        const result = await StoreService.findStoresOwnerReviews()
        const stores = JSON.parse(JSON.stringify(result));
        return stores;
    }
}
