import { schema, normalize } from 'normalizr';
import { METHODS } from "../../server/constants";
import { put } from 'redux-saga/effects'
import { fetchFailed, fetchSucceeded } from "../actions/action";

interface IOptions {
    method: string;
    headers?: Record<string, string>;
    body?: string;
}

export default class Entity {
    // private entityName: string = '';
    // private attributes: Record<string, any>;
    private schema: any;

    constructor(entityName = null, attributes = {}) {
        // this.entityName = entityName;
        // this.attributes = attributes;
        this.schema = entityName ? new schema.Entity(entityName, attributes) : null;
        this.fetchWrapper = this.fetchWrapper.bind(this);
        this.readData = this.readData.bind(this);
        this.saveData = this.saveData.bind(this);
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

    protected normalizationData(data) {
        return normalize(data, Array.isArray(data) ? [this.schema] : this.schema);
    }

    protected * actionRequest(url: string, method: string, data?: Record<string, any>) {
        try {
            const result = yield this.fetchWrapper(url, method, data);
            const normalizedResult = this.normalizationData(result);
            yield put(fetchSucceeded(normalizedResult));
        } catch (error) {
            yield put(fetchFailed(error.message));
        }
    }

    protected readData(url: string) {
        return this.actionRequest(url, METHODS.GET);
    }

    protected saveData(url: string, data: Record<string, any>) {
        return this.actionRequest(url, METHODS.POST, data)
    }
}