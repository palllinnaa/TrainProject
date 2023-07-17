import { IState } from './../server/interfaces/common';
import { AnyAction, applyMiddleware, compose, Dispatch } from "redux";
import BaseClientContext from "./baseClientContext";
import { all } from 'redux-saga/effects';
import Entity from './models/entity';
import createSagaMiddleware, { Task } from 'redux-saga'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';
import { createWrapper } from 'next-redux-wrapper';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface SagaStore extends EnhancedStore<any, AnyAction> {
  sagaTask?: Task;
}

export default class ReduxStore extends BaseClientContext {
  private _store: EnhancedStore<any, AnyAction>;
  public _wrapper;

  public get store(): EnhancedStore<any, AnyAction> {
    return this._store;
  }

  public state = (): IState => {
    return this._store.getState();
  }

  public dispatch = (args: any): Dispatch => {
    return this._store.dispatch(args);
  }

  constructor(opts: any) {
    super(opts);

    const isDebug =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true';
    if (!isDebug) {
      const store = this.configureProdStore();
      this._store = store;
    } else {
      const store = this.configureDevStore();
      this._store = store;
    }
  }

  public rootSaga = (function* () {
    const sagas = Entity.sagas();
    yield all(sagas);
  });

  private configureProdStore(initialState?: IState) {
    const makeStore = () => {
      const sagaMiddleware = createSagaMiddleware();

      const store: EnhancedStore<any, AnyAction> = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
      });

      (store as SagaStore).sagaTask = sagaMiddleware.run(this.rootSaga);
      return store;
    }

    this._wrapper = createWrapper<EnhancedStore<any, AnyAction>>(makeStore, { debug: false });
    return this._wrapper;
  }

  private configureDevStore(initialState?: IState) {
    const makeStore = () => {

      const middleware = [];
      const enhancers = [];

      const sagaMiddleware = createSagaMiddleware();
      middleware.push(sagaMiddleware);

      const composeEnhancers = (typeof window == 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

      enhancers.push(applyMiddleware(...middleware));
      const enhancer = composeEnhancers(...enhancers);

      const store: EnhancedStore<any, AnyAction> = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
        //TODO add enhancers
        // enhancers: enhancer
      });

      (store as SagaStore).sagaTask = sagaMiddleware.run(this.rootSaga);
      return store;
    }

    this._wrapper = createWrapper<EnhancedStore<any, AnyAction>>(makeStore, { debug: true });
    return this._wrapper;
  }
}
