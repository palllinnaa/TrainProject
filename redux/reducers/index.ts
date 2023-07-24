import { isEmpty } from './../../server/constants';
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
            if (!isEmpty(state[reducerName][entityName])) {
              Object.keys(action.payload[reducerName][entityName]).map(id => {
                state = {
                  ...state,
                  [reducerName]: {
                    ...state[reducerName],
                    [entityName]: {
                      ...state[reducerName][entityName],
                      [id]: action.payload[reducerName][entityName][id]
                    }
                  }
                }
              });
            } else {
              state = {
                ...state,
                [reducerName]: {
                  ...state[reducerName],
                  [entityName]: action.payload[reducerName][entityName]
                }
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