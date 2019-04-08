import axios from 'axios';

const API_URL = "http://34.73.221.154:8080";
var fakeUser = "1";
var site = "http://34.73.221.154:8080/users/";


export const getUsers = () => {
    return axios.get(`${API_URL}/users`);
};

export const addCandidate = (payload) => {
    return axios.post(`${API_URL}/users/signup`, payload);
};

export const login = (payload) => {
    return axios.post(`${API_URL}/users/login`, payload);
};

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

export const getJobs = () => {
    return axios.get(`${API_URL}/jobs`);
};

export const getUser = (userID) => {
    return axios.get(`${API_URL}/users/${userID}`);
};

// export const sortCandidateByApplicationStatus = (candidateID) => {
// //     return axios.get(`${API_URL}/users/${candidateID}/applications`);
// // };

export const getRequisitions = () => {
    return axios.get(`${API_URL}/requisitions`);
};

export const getReqsForJob = (jobID) => {
    return axios.get(`${API_URL}/jobs/${jobID}/requisitions`);
};

export const getApplicationsForReq = (reqID) => {
    return axios.get(`${API_URL}/requisitions/${reqID}/applications`);
};

export const getApplicationsForUser = (candidateID) => {
    return axios.get(`${API_URL}/users/${candidateID}/applications`);
};

export const addJobToCandidate = (jobID, payload) => {
    return axios.post(`${API_URL}/jobs/${jobID}/applications`, payload);
};