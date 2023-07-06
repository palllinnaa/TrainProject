import { IState } from './../server/interfaces/common';
import { applyMiddleware, compose, Dispatch, Store } from "redux";
import BaseClientContext from "./baseClientContext";
import { all } from 'redux-saga/effects';
import Entity from './models/entity';
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export default class ReduxStore extends BaseClientContext {
  private _store: Store;
  public get store(): Store<IState> {
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
      const { store } = this.configureProdStore();
      this._store = store;
    } else {
      const { store } = this.configureDevStore();
      this._store = store;
    }
  }

  public rootSaga = (function* () {
    const sagas = Entity.sagas();
    yield all(sagas);
  });

  private configureProdStore(initialState?: IState) {
    const sagaMiddleware = createSagaMiddleware();

    const store: Store<IState> = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
    });

    sagaMiddleware.run(this.rootSaga);
    return { store };
  }

  private configureDevStore = (initialState?: IState) => {
    const middleware = [];
    const enhancers = [];

    const sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);

    const composeEnhancers = (typeof window == 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    enhancers.push(applyMiddleware(...middleware));
    const enhancer = composeEnhancers(...enhancers);

    const store: Store<IState> = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),   // i added
      //TODO add enhancers
      // enhancers: enhancer
    });

    sagaMiddleware.run(this.rootSaga);
    return { store };
  }
}
