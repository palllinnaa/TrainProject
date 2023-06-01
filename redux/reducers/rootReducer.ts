import { combineReducers } from 'redux';
import userReducer from './user';
import storeReducer from './store';
import reviewReducer from './review';
import productReducer from './product';

const rootReducer = combineReducers({
    userReducer,
    storeReducer,
    reviewReducer,
    productReducer
});

export default rootReducer;