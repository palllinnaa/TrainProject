export interface IContextContainer {
    [key: string]: any;
}

export default class BaseContext {
    protected di: IContextContainer;
    private static stopInit: boolean = false;

    constructor(opts: IContextContainer) {
        this.di = opts;
        if (!BaseContext.stopInit) {
            opts.initModels();
            BaseContext.stopInit = true;
        }
    }
}