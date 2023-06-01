import { createStore, compose } from "redux"
import rootReducer from "./reducers/rootReducer"

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}


const composeEnhancers =
  (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers();

// TODO use toolkit
const store = createStore(rootReducer, enhancer);

export default store;