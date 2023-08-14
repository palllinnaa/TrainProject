import { isEmpty } from '../../server/constants';
import { IStateAuthData } from '../../server/interfaces/common';

export default function authReducer(state: IStateAuthData, action: any) {
    const newState = { ...state };
    switch (action.type) {
        case 'GET_IDENTITY':
            delete newState.error
            state = {
                ...newState,
                identity: action.payload
            }
            break;
        case 'GET_IDENTITY_ERROR':
            delete newState.identity
            if ('error' in state && !isEmpty(state.error)) {
                delete newState.error
            }
            state = {
                ...newState,
                error: action.payload
            }
            break;
        case 'CLEAR_IDENTITY_ERROR':
            if ('error' in state && !isEmpty(state.error)) {
                delete newState.error
                state = {
                    ...newState
                }
            } break;
        case 'MESSAGE_IDENTITY_RESPONSE':
            if (action.payload.message) {
                delete newState.responseMessage
                state = {
                    ...newState,
                    responseMessage: action.payload.message
                }
            } break;
            case 'CLEAR_MESSAGE_IDENTITY_RESPONSE':
                if ('responseMessage' in state && !isEmpty(state.responseMessage)) {
                    delete newState.responseMessage
                    state = {
                        ...newState
                    }
                } break;
        default:
            return { ...state }
    }
    return { ...state };
}