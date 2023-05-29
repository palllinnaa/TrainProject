import BaseController from "./baseController";
import { INextApiRequestExtended } from "../interfaces/common";
import GET from "../decorators/get";
import SSR from "../decorators/ssr";

export default class ProductController extends BaseController {
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
