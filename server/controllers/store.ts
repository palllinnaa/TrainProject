import BaseController from './baseController';
import { INextApiRequestExtended } from './../interfaces/common';
import GET from '../decorators/get';
import SSR from '../decorators/ssr';
import USE from '../decorators/use';
import session from '../middleware/session';
import { passportInitialize, passportSession } from '../middleware/passport';
import { schema } from 'normalizr';

@USE([session, passportInitialize, passportSession])
export default class StoreController extends BaseController {
    constructor(opts: any) {
        super(opts);
        this.initSchema('stores', {
            user: new schema.Entity('users'),
            review: [new schema.Entity('reviews')],
            product: [new schema.Entity('products')]
        });
    }

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
