import {
    FETCH_PHOTOS_DATA_SUCCESS,
    FETCH_PHOTOS_DATA_FAIL,
    FETCH_NEW_PHOTO_DATA_SUCCESS
} from './types';
import axios from 'axios';

export const getAllPhotos = (offset) => async (dispatch) => {
    const request = `http://api-mpgallery.tpsoares.com/public/api/photos/offset/${offset}`;
    const token = sessionStorage.getItem('token');
    const headers = {
        'Authorization': 'Bearer ' + token
    }
    
    try {
        const response = await axios.get(request, {headers});

        // console.log(response);
        dispatch({
            type: FETCH_PHOTOS_DATA_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        if (err.response) {
            console.log("TOKEN", token);
            console.log(err.response);
            dispatch({
                type: FETCH_PHOTOS_DATA_FAIL,
                payload: err.response.data
            })
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
}

export const postImage = (data) => async dispatch => {
    const request = `http://api-mpgallery.tpsoares.com/public/api/photos/store`;
    const token = sessionStorage.getItem('token');
    const headers = {
        'Authorization': 'Bearer ' + token,
        // 'Content-Type': 'multipart/form-data',
        // 'Access-Control-Allow-Origin': '*'
    }

    console.log("IMMAGE ACTION: ", data);
    
    try {
        const response = await axios.post(request, {
            title: data.title,
            description: data.description,
            image: data.image
        }, {headers});

        console.log(response);
        
        dispatch({
            type: FETCH_NEW_PHOTO_DATA_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        if (err.response) {
            // console.log("TOKEN", token);
            console.log(err.response);
            dispatch({
                type: FETCH_PHOTOS_DATA_FAIL,
                payload: err.response.data
            })
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
}