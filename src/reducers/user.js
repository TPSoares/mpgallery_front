import { 
    FETCH_SIGNIN_DATA_SUCCESS,
    FETCH_SIGNUP_DATA_SUCCESS,
    FETCH_SIGNIN_DATA_FAIL
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
        default:
            return state;
    }
}