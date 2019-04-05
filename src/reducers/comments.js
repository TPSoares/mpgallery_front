import {
    FETCH_COMMENTS_DATA_SUCCESS,
    FETCH_COMMENTS_DATA_FAIL,
    FETCH_NEW_COMMENT_DATA_SUCCESS,
    FETCH_NEW_COMMENT_DATA_FAIL
} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_COMMENTS_DATA_SUCCESS:
            return action.payload;
        case FETCH_COMMENTS_DATA_FAIL:
            return action.payload;
        case FETCH_NEW_COMMENT_DATA_SUCCESS:
            return action.payload.data;
        case FETCH_NEW_COMMENT_DATA_FAIL:
            return action.payload;
        default:
            return state;
    }
}