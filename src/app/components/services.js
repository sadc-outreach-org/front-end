import axios from 'axios';
var user = "jbutt@gmail.com";
var site = "http://34.73.221.154:8080/";

//'http://34.73.221.154:8080/user/jbutt@gmail.com/resume'


export const getUsers = () => {
    return axios.get('http://cloud-25.cs.trinity.edu:8080/users');
};

export const addCandidate = (payload) => {
    return axios.post('http://cloud-25.cs.trinity.edu:8080/user/signup', payload);
};

export const getResume = () => {
    return axios.get(site.concat(user,"/resume"))
};
export const uploadResume = (pdfFile) => {
    return axios.post(site.concat("user/",user,"/resume"), pdfFile);
};