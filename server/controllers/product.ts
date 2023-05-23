import { NextApiRequest, NextApiResponse } from "next";
import BaseContext from "../baseContext";
import { INextApiRequestExtended } from "../interfaces/common";

export default class ProductController extends BaseContext {
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

    public findProductById = async (req: NextApiRequest, res: NextApiResponse) => {
        const { ProductService } = this.di;
        const { query } = req;
        const id = parseInt(query.id as string, 10);
        const result = await ProductService.findProductById(id);
        let product = JSON.parse(JSON.stringify(result));
        product = {
            ...product,
            property: product.property.split(";"),
            ingredients: product.ingredients.split(";")
        }
        res.status(200).json(product)
    }

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

    public findAllProducts = async (req: NextApiRequest, res: NextApiResponse) => {
        const { ProductService } = this.di;
        const result = await ProductService.findAllProducts()
        const data = JSON.parse(JSON.stringify(result));
        const products = data.map((item) => ({
            ...item,
            property: item.property.split(';'),
        }));
        res.status(200).json(products)
    }
}
