import axios from 'axios';

export const verifyEmail = data => {
    return axios.post('/api/user/verifyEmail', data).then(res => { return res.data })
}

export const uploadImage = data => {
    return axios.post('/employee/upload/image',
        data, { headers: { 'content-type': 'multipart/form-data' } }).then(res => { return res.data })
}

export const downloadImage = data => {
    return axios.post('/employee/download/image', data).then(res => { return res.data })
}