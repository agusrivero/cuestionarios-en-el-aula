import axios from 'axios';
import {NEW_USER, GET_USERS, GET_USER, SET_USER} from './constants';

export const newUser = user => dispatch => {
    const username = user.username;
    const password = user.password;
    const email = user.email;

    axios.post('/admin/create', {username, password, email})
    .then(res => {
        console.log("Created")
    })
}

export const getUsers = () => dispatch => {
    axios.get('/admin/index')
    .then(res => {
        
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    })
}

export const deleteUser = (id, history) => dispatch => {
    axios.delete('/admin/view/'+id)
    .then(res => {
        console.log("Deleted")
        history.push('/users')
    })
}

export const getUser = id => dispatch => {
    
    axios.get('/get/'+id)
    .then(res => {
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    })
}

export const editUser = (user, id) => dispatch => {
    const username = user.username;
    //const password = user.password;
    const email = user.email;
    axios.put('/edit/'+id, {username,email})
    .then(res => {
        
        console.log("Edited")
        dispatch(getUser(id));
       
    })
}