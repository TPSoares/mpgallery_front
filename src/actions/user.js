import { 
    FETCH_SIGNIN_DATA_SUCCESS, 
    FETCH_SIGNUP_DATA_SUCCESS,
    FETCH_SIGNIN_DATA_FAIL,
    FETCH_SIGNOUT_DATA_SUCCESS
} from './types';
import axios from 'axios';

export const signin = (email, password) => async dispatch => {
    const request = "http://laravelteste.webdev-solutions.com/public/api/signin";
        
        try {
            const response = await axios.post(request, {
                email: email,
                password: password
            });

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

export const signup = (data) => async dispatch => {
    const request = "http://laravelteste.webdev-solutions.com/public/api/signup";

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