import BaseServerContext from "../baseServerContext";

export default class ProductService extends BaseServerContext {
    public async findProductById(id: number) {
        const { Products } = this.di;
        const product = await Products.findByPk(id, {
            raw: true
        });
        return {
            ...product,
            property: product.property.split(";"),
            ingredients: product.ingredients.split(";")
        }
    }

    public async findAllProducts() {
        const { Products } = this.di;
        const products = await Products.findAll({
            raw: true
        });
        return products.map((item) => ({
            ...item,
            property: item.property.split(';'),
            ingredients: item.ingredients.split(";")
        }));
    }
}