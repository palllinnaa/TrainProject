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
        case 'MESSAGE':
            if (action.payload) {
                const { message } = action.payload;
                if (message) {
                    Object.keys(message).map(item => {
                        state = {
                            ...state,
                            responseMessage: {
                                ...state.responseMessage,
                                [item]: action.payload.message[item]
                            }
                        }
                    })
                }
            } break;
        default:
            return { ...state }
    }
    return { ...state };
}
