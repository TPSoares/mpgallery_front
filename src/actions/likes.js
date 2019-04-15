import {
    FETCH_LIKE_SUCCESS,
    FETCH_LIKE_FAIL
} from '../actions/types';

import axios from 'axios';

export const setLike = (photo) => async dispatch => {
    const request = `http://api-mpgallery.tpsoares.com/public/api/photos/${photo}/like`;
    const token = sessionStorage.getItem('token');
    const headers = {
        'Authorization': 'Bearer ' + token
    }
    
    try {
        const response = await axios.post(request, {} , {headers});

        console.log(response);
        dispatch({
            type: FETCH_LIKE_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        if (err.response) {
            // console.log("TOKEN", token);
            console.log(err.response);
            dispatch({
                type: FETCH_LIKE_FAIL,
                payload: err.response.data
            })
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
}