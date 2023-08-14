import { IResult } from './../interfaces/common';
import BaseServerContext from "../baseServerContext";
import { MESSAGE_TYPE } from '../constants';

export default class ProductService extends BaseServerContext {
    public async findProductById(id: number) {
        const { Products } = this.di;
        let result: IResult = {};
        const product = await Products.findByPk(id, {
            raw: true
        });
        result.data = {
            ...product,
            property: product.property.split(";"),
            ingredients: product.ingredients.split(";")
        }
        result.message = 'Product which id is ' + id + ' was ' + (result.data ? '' : ' not ') + 'found';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_CONSOLE : MESSAGE_TYPE.ERROR_CONSOLE;
        return result;
    }

    public async findAllProducts() {
        const { Products } = this.di;
        let result: IResult = {};
        const products = await Products.findAll({
            raw: true
        });
        result.data = products.map((item) => ({
            ...item,
            property: item.property.split(';'),
            ingredients: item.ingredients.split(";")
        }));
        result.message = 'All products was ' + (result.data ? '' : ' not ') + 'found';
        result.messageType = result.data ? MESSAGE_TYPE.SUCCEEDED_TOAST : MESSAGE_TYPE.ERROR_TOAST;
        return result;
    }
}