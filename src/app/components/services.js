import axios from 'axios';


export const getUsers = () => {
    return axios.get('http://cloud-25.cs.trinity.edu:8080/users');
}

export const addCandidate = (payload) => {
    return axios.post('http://cloud-25.cs.trinity.edu:8080/user/signup', payload);
}

export const getResume = () => {
    return axios.get('http://34.73.221.154:8080/user/jbutt@gmail.com/resume')
}