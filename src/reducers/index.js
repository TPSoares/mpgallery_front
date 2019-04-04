import { combineReducers } from "redux";
import userReducer from './user';
import photosReducer from './photos';
import commentsReducer from './comments';

export default combineReducers({
    user: userReducer,
    photos: photosReducer,
    comments: commentsReducer
});