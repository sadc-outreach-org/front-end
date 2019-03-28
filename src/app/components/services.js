import axios from 'axios';

var user = "1";
var site = "http://34.73.221.154:8080/users/";
const API_URL = "http://34.73.221.154:8080";

export const getUsers = () => {
    return axios.get('http://34.73.221.154:8080/users/');
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