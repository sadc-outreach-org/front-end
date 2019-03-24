import axios from 'axios';
const API_URL = "http://34.73.221.154:8080";
var fakeUser = "2";
var site = "http://34.73.221.154:8080/users/";
//http://34.73.221.154:8080/users/{userID}/resume
//http://34.73.221.154:8080/users/4/resume


export const getUsers = () => {

    return axios.get(`${API_URL}/users`);
}

export const addCandidate = (payload) => {
    return axios.post(`${API_URL}/users/signup`, payload);
}

export const login = (payload) => {
    return axios.post(`${API_URL}/users/login`, payload);
}

// TODO: Don't hardcode the user ID
export const getResume = () => {

    return  axios(site.concat(fakeUser,"/resume"), {


        method: 'GET',
        responseType: 'blob' //Force to receive data in a Blob Format
    })
    //axios.get(site.concat(user,"/resume"))
};

export const uploadResume = (user, pdfFile) => {
    return axios.post(site.concat(user,"/resume"), pdfFile);
};

export const getUser = (userID) => {
    return axios.get(`${API_URL}/users/${userID}`);
}