import { isEmpty } from '../../server/constants';
import { IStateAuthData } from '../../server/interfaces/common';

const initialIdentity = {
    identity: null,
    error: null
}

export default function authReducer(state: IStateAuthData = initialIdentity, action: any) {
    switch (action.type) {
        case 'GET_IDENTITY':
            state = {
                ...initialIdentity,
                identity: action.payload
            }
            break;
        case 'GET_IDENTITY_ERROR':
            state = {
                ...initialIdentity,
                error: action.payload
            }
            break;
        case 'CLEAR_IDENTITY_ERROR':
            if ('error' in state && !isEmpty(state.error)) {
                state = {
                    ...state,
                    error: null,
                }
            } break;
        default:
            return { ...state }
    }
    return { ...state };
}