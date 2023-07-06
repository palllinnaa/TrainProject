import { IServerContextContainer } from "./container";

export default class BaseServerContext {
    protected di: IServerContextContainer;

    constructor(opts: IServerContextContainer) {
        this.di = opts;
    }
}