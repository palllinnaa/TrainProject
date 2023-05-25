import BaseContext from "../baseContext";

export default class ProductService extends BaseContext {
    public async findProductById(id: number) {
        const { Products } = this.di;
        return await Products.findByPk(id);
    }

    public async findAllProducts() {
        const { Products } = this.di;
        return await Products.findAll();
    }
}