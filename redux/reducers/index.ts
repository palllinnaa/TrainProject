import { IState, IAction } from './../../server/interfaces/common';
import entitiesReducer from './entityReducer'
import authReducer from './authReducer'
import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

const reducers = combineReducers({
  entitiesReducer: entitiesReducer,
  authReducer: authReducer,
});

const rootReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case HYDRATE:
      if (action.payload) {
        Object.keys(action.payload).map(reducerName => {
          Object.keys(action.payload[reducerName]).map(entityName => {
            state = {
              ...state,
              [reducerName]: {
                ...state[reducerName],
                [entityName]: action.payload[reducerName][entityName]
              }
            }
          });
        });
      }
      break;
    default:
      return reducers(state, action);
  }
  return state;
};

export default rootReducer;