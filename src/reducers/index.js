import { combineReducers } from "redux";
import userReducer from './user';
import photosReducer from './photos';

export default combineReducers({
    user: userReducer,
    photos: photosReducer
});