import {
    FETCH_PHOTOS_DATA_SUCCESS,
    FETCH_PHOTOS_DATA_FAIL
} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_PHOTOS_DATA_SUCCESS:
            return action.payload;
        case FETCH_PHOTOS_DATA_FAIL:
            return action.payload;
        default:
            return state;
    }
}