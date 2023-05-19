import BaseContext from "../baseContext";

export default class ProductService extends BaseContext {
    public findProductById(id: number) {
        const { Products } = this.di;
        return Products.findByPk(id, {
            raw: true
        });
    }

    public findAllProducts() {
        const { Products } = this.di;
        return Products.findAll({
            raw: true
        });
    }
}