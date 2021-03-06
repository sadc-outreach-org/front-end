import axios from 'axios';
import {addNotification} from "./components/services";

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
    return axios.post(`${API_URL}/login`, payload);
};


export const submitGitLink = (payload, appID) => {
    return axios.post(`${API_URL}/applications/${appID}/gitLink`, payload);
};

export const getResume = (UserID) => {
    return  axios(site.concat(UserID,"/resume"), {


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

export const getApplicationsForUser = (userID) => {
    return axios.get(`${API_URL}/users/${userID}/applications`);
};

export const addJobToCandidate = (jobID, payload) => {
    return axios.post(`${API_URL}/jobs/${jobID}/applications`, payload).then(res => addNotification(payload.candidateID, "You have been added to a new opening! Check the applications tab for more information."));
};

export const setInterviewForApplication = (appID, payload) => {
    return axios.post(`${API_URL}/applications/${appID}/interviewTime`, payload);
};

export const getApplicationDetails = (appID) => {
    return axios.get(`${API_URL}/applications/${appID}`);
};

export const updateCandidateProfile = (userID, payload) => {
    return axios.post(`${API_URL}/users/${userID}`, payload);
};

export const getCandidateInfo = (candidateID) => {
    return axios.get(`${API_URL}/users/${candidateID}`);
};