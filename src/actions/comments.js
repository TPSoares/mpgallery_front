import { 
    FETCH_COMMENTS_DATA_SUCCESS,
    FETCH_COMMENTS_DATA_FAIL,
    FETCH_NEW_COMMENT_DATA_SUCCESS,
    FETCH_NEW_COMMENT_DATA_FAIL
} from './types';

import axios from 'axios';

export const getComments = (photo, offset, limit) => async dispatch => {
    const request = `http://laravelteste.webdev-solutions.com/public/api/photos/${photo}/comment/offset/${offset}/limit/${limit}`;

    const token = sessionStorage.getItem('token');
    const headers = {
        'Authorization': 'Bearer ' + token
    }
    
    try {
        const response = await axios.get(request, {headers});

        console.log(response);
        dispatch({
            type: FETCH_COMMENTS_DATA_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        if (err.response) {
            console.log("TOKEN", token);
            console.log(err.response);
            dispatch({
                type: FETCH_COMMENTS_DATA_FAIL,
                payload: err.response.data
            })
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
}

export const createComment = (photo, comment) => async dispatch => {
    const request = `http://laravelteste.webdev-solutions.com/public/api/photos/${photo}/comment`;

    const token = sessionStorage.getItem('token');
    const headers = {
        'Authorization': 'Bearer ' + token
    }
    
    try {
        const response = await axios.post(request,  {comment: comment}, {headers});

        console.log(response);
        dispatch({
            type: FETCH_NEW_COMMENT_DATA_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        if (err.response) {
            console.log("TOKEN", token);
            console.log(err.response);
            dispatch({
                type: FETCH_NEW_COMMENT_DATA_FAIL,
                payload: err.response.data
            })
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
}
