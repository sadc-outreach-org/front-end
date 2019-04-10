import axios from 'axios';

var user = "1";
var site = "http://34.73.221.154:8080/users/";
const API_URL = "http://34.73.221.154:8080";

export const getUsers = () => {
    return axios.get('http://34.73.221.154:8080/users/');
};

export const sortUsersByApplicationDesc = () => {
    return axios.get('http://34.73.221.154:8080/users?orderBy=status&sort=desc');
};

export const sortUsersByApplicationAsc = () => {
    return axios.get('http://34.73.221.154:8080/users?orderBy=status&sort=asc');
};

export const sortUsersByFirstNameAsc = () => {
    return axios.get('http://34.73.221.154:8080/users?orderBy=firstName&sort=asc');
};

export const sortUsersByFirstNameDesc = () => {
    return axios.get('http://34.73.221.154:8080/users?orderBy=firstName&sort=desc');
};

export const sortUsersByLastNameAsc = () => {
    return axios.get('http://34.73.221.154:8080/users?orderBy=lastName&sort=asc');
};

export const sortUsersByLastNameDesc = () => {
    return axios.get('http://34.73.221.154:8080/users?orderBy=lastName&sort=desc');
};

export const sortUsersByEmailAsc = () => {
    return axios.get('http://34.73.221.154:8080/users?orderBy=email&sort=asc');
};

export const sortUsersByEmailDesc = () => {
    return axios.get('http://34.73.221.154:8080/users?orderBy=email&sort=desc');
};

export const addCandidate = (payload) => {
    return axios.post('http://34.73.221.154:8080/users/signup', payload);
};

export const getResume = () => {
    return  axios(site.concat(user,"/resume"), {
        method: 'GET',
        responseType: 'blob' //Force to receive data in a Blob Format
    })
    //axios.get(site.concat(user,"/resume"))
};

export const uploadResume = (userID, pdfFile) => {
    return axios.post(site.concat(userID,"/resume"), pdfFile);
};

export const getNotifications = (userID) => {
    return axios.get(site.concat("/getNotifications?userid=", userID));
};

export const getCandidateInfo = (candidateID) => {
    return axios.get(`${API_URL}/users/${candidateID}`);
}