import { isEmpty } from '../../server/constants';
import { IStateEntityData } from '../../server/interfaces/common';

export default function entitiesReducer(state: IStateEntityData, action: any) {
    const typeOfAction = action.type.split("_")
    const type = typeOfAction[typeOfAction.length - 1]
    switch (type) {
        case 'SUCCEEDED':
            if (action.payload) {
                const entities = action.payload.entities;
                if (entities) {
                    Object.keys(entities).map(entityName => {
                        if (entityName in state && !isEmpty(state[entityName])) {
                            Object.keys(entities[entityName]).map(id => {
                                let newState = { ...state[entityName] };
                                delete newState[id]
                                state = {
                                    ...state,
                                    [entityName]: newState
                                }
                                state = {
                                    ...state,
                                    [entityName]: {
                                        ...state[entityName],
                                        [id]: entities[entityName][id]
                                    }
                                }
                            });
                        } else if (!(entityName in state)) {
                            state = {
                                ...state,
                                [entityName]: entities[entityName]
                            }
                        }
                    });
                } 
            } break;
        case 'FAILED':
            if (action.payload) {
                const errorMessage = action.payload;
                if ('error' in state && !isEmpty(state.error)) {
                    const { error, ...rest } = state;
                    state = {
                        ...rest,
                        error: errorMessage
                    }
                } else if (!('error' in state) || isEmpty(state.error)) {
                    state = {
                        ...state,
                        error: errorMessage
                    }
                }
            } break;
        default:
            return { ...state }
    }
    return { ...state };
}



//------------------------------------------------------------------------------------------------------------------------


// import { combineReducers } from 'redux';
// import { IStateData } from '../../server/interfaces/common';

// const rootReducer = combineReducers({
//     reducer,
//     // ...reducer
// });

// export default rootReducer;

// function entitiesReducer(state: IStateData, action: any) {
//     const typeOfAction = action.type.split("_")
//     const type = typeOfAction[typeOfAction.length - 1]
//     const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;
//     switch (type) {
//         case 'SUCCEEDED':
//             if (action.payload) {
//                 const entities = action.payload.entities;
//                 if (entities) {
//                     Object.keys(entities).map(entityName => {
//                         if (entityName in state && !isEmpty(state[entityName])) {
//                             Object.keys(entities[entityName]).map(id => {
//                                 // delete state[entityName][id];       //? error   
//                                 let newState = { ...state[entityName] };
//                                 entityName !== 'identity' ? delete newState[id] : newState = {}

//                                 state = {
//                                     ...state,
//                                     [entityName]: entityName !== 'identity' ? {
//                                         ...state[entityName],
//                                         [id]: newState
//                                     } : newState
//                                 } 
//                                 // state[entityName][id] = entities[entityName][id];    //? error
//                                 state = {
//                                     ...state,
//                                     [entityName]: entityName !== 'identity' ? {
//                                         ...state[entityName],
//                                         [id]: entities[entityName][id]
//                                     } : entities[entityName][id]
//                                 }
//                             });
//                         } else if (!(entityName in state)) {
//                             Object.keys(entities[entityName]).map(id => {
//                                 state = {
//                                     ...state,
//                                     [entityName]: entityName !== 'identity' ? entities[entityName] : entities[entityName][id]   //? error
//                                 }
//                             });
//                         }
//                     });
//                     console.log('state ---- ', state)
//                 }
//                 // } else {
//                 //     const data = action.payload
//                 //     Object.keys(data).map(entityName => {
//                 //         if (entityName in state && !isEmpty(state[entityName])) {
//                 //             const { identity = state[entityName], ...rest } = state;
//                 //             state = {
//                 //                 ...rest,
//                 //                 [entityName]: data[entityName]
//                 //             }
//                 //         } else if (!(entityName in state) || !isEmpty(state.error)) {
//                 //             state = {
//                 //                 ...state,
//                 //                 [entityName]: data[entityName]
//                 //             }
//                 //         }
//                 //     });
//                 // }
//             } break;
//         case 'FAILED':
//             if (action.payload) {
//                 const errorMessage = action.payload;
//                 if ('error' in state && !isEmpty(state.error)) {
//                     // delete state.error;
//                     const { error, ...rest } = state;
//                     state = {
//                         ...rest,
//                         error: errorMessage
//                     }
//                 } else if (!('error' in state) || isEmpty(state.error)) {
//                     state = {
//                         ...state,
//                         error: errorMessage
//                     }
//                 }
//             } break;
//         case 'CLEAR':
//             if ('error' in state && !isEmpty(state.error)) {
//                 const { error, ...rest } = state;
//                 state = {
//                     ...rest,
//                 }
//             } break;
//         default:
//             return { ...state }
//     }
//     return { ...state };
// }

