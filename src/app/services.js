import axios from 'axios';

const API_URL = "http://34.73.221.154:8080";

export const getUsers = () => {
    return axios.get(`${API_URL}/user/users`);
}

export const addCandidate = (payload) => {
    return axios.post(`${API_URL}/user/signup`, payload);
}

export const login = (payload) => {
    return axios.post(`${API_URL}/user/login`, payload);
}