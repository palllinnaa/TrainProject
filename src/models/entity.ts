import { entity, METHODS } from "../../server/constants";

interface IOptions {
    method: string;
    headers?: Record<string, string>;
    body?: string;
}
export default class Entity {
    constructor() {
        this.fetchWrapper.bind(this);
    }
    protected async fetchWrapper(url: string, method: string, data?: Record<string, any>) {
        url = `/api/${url}`;
        const options: IOptions = {
            method: method,
        }
        if (method === METHODS.POST) {
            options.headers = {
                "Content-Type": "application/json"
            },
            options.body = JSON.stringify(data);
        }
        let res = await fetch(url, options);
        if (res.ok === true) {
            const result = await res.json();
            return result;
        } else {
            throw new Error("Something went wrong!");
        }
    }

    protected readData(url: string) {
        return entity.fetchWrapper(url, METHODS.GET)
    }

    protected saveData(url: string, data: Record<string, any>) {
        return entity.fetchWrapper(url, METHODS.POST, data)
    }
}