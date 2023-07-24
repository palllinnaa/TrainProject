import BaseController from "./baseController";
import { INextApiRequestExtended } from "../interfaces/common";
import GET from "../decorators/get";
import SSR from "../decorators/ssr";
import USE from "../decorators/use";
import session from "../middleware/session";
import { passportInitialize, passportSession } from "../middleware/passport";
import { schema } from "normalizr";

@USE([session, passportInitialize, passportSession])
export default class ProductController extends BaseController {
    constructor(opts: any) {
        super(opts);
        this.initSchema('products', {
            store: new schema.Entity('stores')
        });
    }

    @SSR('/product/:id')
    @GET('/api/product/:id')
    public async findProductById(req: INextApiRequestExtended) {
        const { ProductService } = this.di;
        const { params } = req;
        const id = parseInt(params.id as string, 10);
        return await ProductService.findProductById(id);
    }

    @SSR("/")
    @GET('/api/products')
    public async findAllProducts() {
        const { ProductService } = this.di;
        return await ProductService.findAllProducts();
    }
}
