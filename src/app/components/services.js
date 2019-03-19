import axios from 'axios';
var user = "1";
var site = "http://34.73.221.154:8080/users/";
//http://34.73.221.154:8080/users/{userID}/resume

//'http://34.73.221.154:8080/user/jbutt@gmail.com/resume'


export const getUsers = () => {
    return axios.get('http://34.73.221.154:8080/users/');
};

export const addCandidate = (payload) => {
    return axios.post('http://cloud-25.cs.trinity.edu:8080/users/signup', payload);
};

export const getResume = () => {
    return  axios(site.concat(user,"/resume"), {
        method: 'GET',
        responseType: 'blob' //Force to receive data in a Blob Format
    })
    //axios.get(site.concat(user,"/resume"))
};

export const uploadResume = (pdfFile) => {
    return axios.post(site.concat(user,"/resume"), pdfFile);
};