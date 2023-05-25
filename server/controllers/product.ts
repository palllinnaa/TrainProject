import { NextApiRequest } from "next";
import { INextApiRequestExtended } from "../interfaces/common";
import BaseController from "./baseController";
import GET from "./decorators/get";

export default class ProductController extends BaseController {
    @GET('/product/:id')
    public findProductByIdServerSideProps = async (req: INextApiRequestExtended) => {
        const { ProductService } = this.di;
        const id = req.params.id;
        const result = await ProductService.findProductById(id);
        let product = JSON.parse(JSON.stringify(result));
        product = {
          ...product,
          property: product.property.split(";"),
          ingredients: product.ingredients.split(";")
        }
        return { props: { data: product } };
    }

    @GET('/api/product/:id')
    public async findProductById(req: INextApiRequestExtended) {
        const { ProductService } = this.di;
        const { params } = req;
        const id = parseInt(params.id as string, 10);
        const result = await ProductService.findProductById(id);
        let product = JSON.parse(JSON.stringify(result));
        product = {
            ...product,
            property: product.property.split(";"),
            ingredients: product.ingredients.split(";")
        }
        return product;
    }

    @GET()
    public findAllProductsServerSideProps = async (req: NextApiRequest) => {
        const { ProductService } = this.di;
        const result = await ProductService.findAllProducts()
        const data = JSON.parse(JSON.stringify(result));
        const products = data.map((item) => ({
          ...item,
          property: item.property.split(";"),
        }));
        return { props: { data: products } };
    }

    @GET('/api/products')
    public async findAllProducts() {
        const { ProductService } = this.di;
        const result = await ProductService.findAllProducts()
        const data = JSON.parse(JSON.stringify(result));
        const products = data.map((item) => ({
            ...item,
            property: item.property.split(';'),
        }));
        return products;
    }
}
