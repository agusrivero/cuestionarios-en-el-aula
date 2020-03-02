import axios from 'axios';
import {history} from '../helpers/history'
import {LOGIN_REQUEST} from './constants'

export const login = (data) => {
    return {
        type: LOGIN_REQUEST,
        payload: {data}
    }
}
