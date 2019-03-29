import { FETCH_LOGIN_DATA } from '../actions/types';

export default function userReducer(state = {}, action) {
    switch(action.type) {
        case FETCH_LOGIN_DATA:
            return;
            break;
        default:
            return state;
    }
}