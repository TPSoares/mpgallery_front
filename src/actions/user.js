import { 
    FETCH_SIGNIN_DATA_SUCCESS, 
    FETCH_SIGNUP_DATA_SUCCESS,
    FETCH_SIGNIN_DATA_FAIL,
    FETCH_SIGNOUT_DATA_SUCCESS,
    FETCH_USER_PHOTOS_DATA_SUCCESS,
    FETCH_USER_PHOTOS_DATA_FAIL,
    FETCH_USER_INFO_DATA_SUCCESS,
    FETCH_USER_INFO_DATA_FAIL,
    FETCH_USER_PROFILE_PICTURE_SUCCESS,
    FETCH_USER_PROFILE_PICTURE_FAIL
} from './types';
import axios from 'axios';

export const signin = (email, password) => async dispatch => {
    const request = "http://api-mpgallery.tpsoares.com/public/api/signin";
        
        try {
            const response = await axios.post(request, {
                email: email,
                password: password
            });
            console.log(response);
            //get token and store it on session
            sessionStorage.setItem('token', response.data.data.token);

            dispatch({
                type: FETCH_SIGNIN_DATA_SUCCESS,
                payload: response.data
            });
        } catch (err) {
            if (err.response) {
                console.log(err.response);
                dispatch({
                    type: FETCH_SIGNIN_DATA_FAIL,
                    payload: err.response.data
                })
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log(err);
            }
        }
}

export const userPhotos = () => async dispatch => {
    const request = `http://api-mpgallery.tpsoares.com/public/api/user/photos`;
    const token = sessionStorage.getItem('token');
    const headers = {
        'Authorization': 'Bearer ' + token
    }
    
    try {
        const response = await axios.get(request, {headers});

        // console.log(response);
        dispatch({
            type: FETCH_USER_PHOTOS_DATA_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        if (err.response) {
            console.log("TOKEN", token);
            console.log(err.response);
            dispatch({
                type: FETCH_USER_PHOTOS_DATA_FAIL,
                payload: err.response.data
            })
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
}

export const signup = (data) => async dispatch => {
    const request = "http://api-mpgallery.tpsoares.com/public/api/signup";

    // console.log(data);
    try {
        const response = await axios.post(request, {
            name: data.name,
            email: data.email,
            password: data.password,
            age: data.age,
            gender: data.gender
        });

         //get token and store it on session
         sessionStorage.setItem('token', response.data.data.token);

         dispatch({
            type: FETCH_SIGNUP_DATA_SUCCESS,
            payload: response.data
        });

    } catch (err) {
        if (err.response) {
            console.log(err.response);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
}

export const signout = () => async dispatch => {
    try {
        sessionStorage.removeItem('token');
        dispatch({
            type: FETCH_SIGNOUT_DATA_SUCCESS,
            payload: 'loggedout'
        })
    } catch (err) {
        if (err.response) {
            console.log(err.response);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
}

export const edit = (data) => async dispatch => {
    const request = "http://api-mpgallery.tpsoares.com/public/api/user/edit";
    const token = sessionStorage.getItem('token');
    const headers = {
        'Authorization': 'Bearer ' + token,
        // 'Content-Type': 'multipart/form-data',
        // 'Access-Control-Allow-Origin': '*'
    }
    // console.log(data);
    try {
        const response = await axios.put(request, {
            name: data.name,
            email: data.email,
            age: data.age,
            gender: data.gender
        }, {headers});

        console.log(response);

        dispatch({
            type: FETCH_USER_INFO_DATA_SUCCESS,
            payload: response.data
        });

    } catch (err) {
        if (err.response) {
            console.log(err.response);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
}

export const setProfilePicture = (picture) => async dispatch => {
    const request = `http://api-mpgallery.tpsoares.com/public/api/user/profile_picture`;
    const token = sessionStorage.getItem('token');
    const headers = {
        'Authorization': 'Bearer ' + token,
        // 'Content-Type': 'multipart/form-data',
        // 'Access-Control-Allow-Origin': '*'
    }

    // console.log("IMMAGE ACTION: ", picture);
    
    try {
        const response = await axios.post(request, {
            image: picture
        }, {headers});

        console.log(response);
        
        dispatch({
            type: FETCH_USER_PROFILE_PICTURE_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        if (err.response) {
            // console.log("TOKEN", token);
            console.log(err.response);
            dispatch({
                type: FETCH_USER_PROFILE_PICTURE_FAIL,
                payload: err.response.data
            })
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
} 