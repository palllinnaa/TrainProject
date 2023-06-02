import { METHODS } from "../../server/constants";

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
        
        let res = await fetch(url, options)
        if (res.ok) {
            const result = await res.json();
            return result;
        } else {
            return {};
        }
    }

    public readData(url: string) {
        return this.fetchWrapper(url, METHODS.GET)
    }

    public saveData(url: string, data: Record<string, any>) {
        return this.fetchWrapper(url, METHODS.POST, data)
    }
}

