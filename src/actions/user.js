import { FETCH_LOGIN_DATA } from './types';
import axios from 'axios';

export const signin = (email, password) => {
    const request = "http://laravelteste.webdev-solutions.com/public/api/signin";

    axios({
        method: 'POST',
        url: request,
        data: {
            email: email,
            password: password
        }
    })
    .then((json) => {
        console.log(json.data)
    })
    .catch((err) => {
        console.log(err);
    })
}