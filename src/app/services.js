import axios from 'axios';
const API_URL = "http://34.73.221.154:8080";
var user = "1";
var site = "http://34.73.221.154:8080/users/";


export const getUsers = () => {
    return axios.get(`${API_URL}/user/users`);
};

export const addCandidate = (payload) => {
    return axios.post(`${API_URL}/user/signup`, payload);
};

export const login = (payload) => {
    return axios.post(`${API_URL}/user/login`, payload);
};
export const getResume = () => {
    //http://34.73.221.154:8080/users/1/resume
    return  axios('http://34.73.221.154:8080/users/1/resume', {
        method: 'GET',
        responseType: 'blob' //Force to receive data in a Blob Format
    })
    //axios.get(site.concat(user,"/resume"))
};
export const uploadResume = (pdfFile) => {
    return axios.post(site.concat(user,"/resume"), pdfFile);
};