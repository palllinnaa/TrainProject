import entitiesReducer from './entityReducer'
import authReducer from './authReducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    entitiesReducer: entitiesReducer,
    authReducer: authReducer
});

export default rootReducer;