import axios from 'axios';
import {NEW_USER} from './constants';

export const newUser = user => dispatch => {
    const username = user.username;
    const password = user.password;
    const email = user.email;

    axios.post('/admin/create', {username, password, email})
    .then(res => {
        console.log("My data", res.data)
    })
}

export const getUsers = () => dispatch => {
    axios.get('/admin/index')
    .then(res => {
        console.log(res.data)
    })
}