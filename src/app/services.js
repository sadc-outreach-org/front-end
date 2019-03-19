import axios from 'axios';

const API_URL = "http://34.73.221.154:8080";

export const getUsers = () => {
    return axios.get(`${API_URL}/users`);
}

export const addCandidate = (payload) => {
    return axios.post(`${API_URL}/users/signup`, payload);
}

export const login = (payload) => {
    return axios.post(`${API_URL}/users/login`, payload);
}

export const getUser = (userID) => {
    return axios.get(`${API_URL}/users/${userID}`);
}