import {
    FETCH_PHOTOS_DATA_SUCCESS,
    FETCH_PHOTOS_DATA_FAIL
} from './types';
import axios from 'axios';

export const getAllPhotos = (page) => async (dispatch) => {
    const request = `http://laravelteste.webdev-solutions.com/public/api/photos?page=${page}`;
    const token = sessionStorage.getItem('token');
    const headers = {
        'Authorization': 'Bearer ' + token
    }
    
    try {
        const response = await axios.get(request, {headers});

        console.log(response);
        dispatch({
            type: FETCH_PHOTOS_DATA_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        if (err.response) {
            console.log("TOKEN", token);
            console.log(err.response);
            // dispatch({
            //     type: FETCH_PHOTOS_DATA_FAIL,
            //     payload: err.response.data
            // })
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
}