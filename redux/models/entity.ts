import { schema, normalize } from 'normalizr';
import { METHODS } from "../../server/constants";
import { call, fork, put, take } from 'redux-saga/effects'
import { action, fetchFailed, fetchSucceeded } from "../actions/action";
import 'reflect-metadata';
import { ISagaMethods } from '../../server/interfaces/common';
import clientContainer from '../container';
import BaseClientContext from '../baseClientContext';

interface IOptions {
    method: string;
    headers?: Record<string, string>;
    body?: string;
}

export default class Entity extends BaseClientContext {
    // private entityName: string = '';
    // private attributes: Record<string, any>;
    private schema: any;
    private static _actions = [];

    constructor(opts: any) {
        super(opts);
        this.fetchWrapper = this.fetchWrapper.bind(this);
        this.readData = this.readData.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    protected initSchema(entityName = '', attributes: any = {}) {
        this.schema = entityName ? new schema.Entity(entityName, attributes) : null;
    }

    protected async fetchWrapper(url: string, method: string, data?: Record<string, any>) {
        url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/${url}`;
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
        return this.actionRequest(url, METHODS.POST, data);
    }

    public static sagas() {
        const objects: ISagaMethods[] = Reflect.getMetadata("sagas", Entity);
        return objects.map(o => {
            const actionName = o.className + '_' + o.methodName;
            const classInstance = clientContainer.resolve(o.className)
            const method = classInstance[o.methodName].bind(classInstance);
            const saga = function* () {
                while (true) {
                    const data = yield take(actionName);
                    yield call(method, data);
                }
            }
            Entity._actions = {
                ...Entity._actions,
                [actionName]: (data) => action(actionName, data)
            }
            return fork(saga);
        })
    }

    public action(methodName, data?) {
        return Entity._actions[this.constructor.name + '_' + methodName](data);
    }

}
