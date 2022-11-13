import axios from 'axios';

export default function callApi(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `https://63553cf1da523ceadcfd4ca1.mockapi.io/api/v1/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
    
}