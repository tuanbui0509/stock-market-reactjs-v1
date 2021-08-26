import axios from 'axios';
import * as Config from '../constants/Config'
export default function callApi(endpoint, method, body = {}) {
    let token = localStorage.getItem("token");

    if (token === null)
        return axios({
            method: method,
            url: `${Config.API_URL}/${endpoint}`,
            data: body
        }).catch(err => (err.response))
    else {
        token = JSON.parse(token);
        // console.log(token);
        let auToken = `Bearer ${token}`;
        return axios({
            method: method,
            url: `${Config.API_URL}/${endpoint}`,
            headers: { Authorization: auToken },
            data: body
        }).catch(err => (err.response))
    }

}