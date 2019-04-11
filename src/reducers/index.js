import { combineReducers } from "redux";
import userReducer from './user';
import photosReducer from './photos';
import commentsReducer from './comments';
import likeReducer from './likes';

const appReducer = combineReducers({
    user: userReducer,
    photos: photosReducer,
    comments: commentsReducer,
    likes: likeReducer
});

const rootReducer = (state, action) => {
    let token = sessionStorage.getItem('token');
    // console.log(token);
    if (!token || token === null) {
        state = undefined;
    }

    return appReducer(state, action);
}

export default rootReducer;