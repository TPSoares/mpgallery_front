import {
    FETCH_LIKE_SUCCESS,
    FETCH_LIKE_FAIL
} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_LIKE_SUCCESS:
            return action.payload;
        case FETCH_LIKE_FAIL:
            return action.payload;
        default:
            return state;
    }
}