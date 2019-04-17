import { 
    FETCH_SIGNIN_DATA_SUCCESS,
    FETCH_SIGNUP_DATA_SUCCESS,
    FETCH_SIGNIN_DATA_FAIL,
    FETCH_SIGNOUT_DATA_SUCCESS,
    FETCH_USER_PHOTOS_DATA_SUCCESS,
    FETCH_USER_PHOTOS_DATA_FAIL,
    FETCH_USER_INFO_DATA_SUCCESS
} from '../actions/types';


// export default function (state = [], action) {
//     console.log("ACTION", action);
//     switch(action.type) {
//         case FETCH_SIGNIN_DATA_SUCCESS:
//             return action.payload;
//         default:
//             return state;
//     }
// }

export default function(state = [], action) {
    // console.log(action);
    switch(action.type) {
        case FETCH_SIGNIN_DATA_SUCCESS:
            return action.payload;
        case FETCH_SIGNUP_DATA_SUCCESS:
            return action.payload;
        case FETCH_SIGNIN_DATA_FAIL:
            return action.payload;
        case FETCH_SIGNOUT_DATA_SUCCESS:
            return action.payload;
        case FETCH_USER_PHOTOS_DATA_SUCCESS:
            return {...state, photos: action.payload};
        case FETCH_USER_PHOTOS_DATA_FAIL:
            return {...state, photos: action.payload};
        case FETCH_USER_INFO_DATA_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}