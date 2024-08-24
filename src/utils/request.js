import axios from 'axios'

// axios.defaults.withCredentials = true;
const request = axios.create({
  // baseURL: 'http://localhost:8080/', // API server url
  // baseURL: 'http://192.168.29.43:8080/', // API server url
  baseURL: 'https://hrm.dev.api.ideauxbill.in/', // API server url
  // baseURL: 'http://192.168.29.66:8089/', // Sanjay API server url
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export default request

// export const base = 'http://localhost:8080';
// export const base = 'http://192.168.29.66:8089';
export const  base = 'https://hrm.dev.api.ideauxbill.in';


