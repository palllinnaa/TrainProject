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
        default:
            return { ...state }
    }
    return { ...state };
}