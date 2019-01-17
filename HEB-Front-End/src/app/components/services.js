import axios from 'axios';

export const getUsers = () => {
    return axios.get('http://cloud-25.cs.trinity.edu:8080/users');
}

export const addCandidate = (payload) => {
    return axios.post('http://cloud-25.cs.trinity.edu:8080/user/signup', payload);
}