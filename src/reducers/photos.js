import {
    FETCH_PHOTOS_DATA_SUCCESS,
    FETCH_PHOTOS_DATA_FAIL,
    FETCH_NEW_PHOTO_DATA_SUCCESS
} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_PHOTOS_DATA_SUCCESS:
            return action.payload.data;
        case FETCH_NEW_PHOTO_DATA_SUCCESS:
            return [action.payload.data, ...state];
        case FETCH_PHOTOS_DATA_FAIL:
            return action.payload;
        default:
            return state;
    }
}