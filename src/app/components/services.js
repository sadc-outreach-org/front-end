import axios from 'axios';

export const getUsers = () => {
    return axios.get('http://34.73.21.154:8080/users');
}

export const addCandidate = (payload) => {
    return axios.post('http://34.73.21.154:8080/user/signup', payload);
}