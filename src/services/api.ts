import axios from 'axios';

// export const apiFake = axios.create({
//   baseURL: 'http://localhost:3001/',
//   responseType: 'json',
//   timeout: 5000,
// });

export const apiFake = axios.create({
  baseURL: 'http://51.81.9.89:6002/',
  responseType: 'json',
  timeout: 10000,
});

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  responseType: 'json',
  timeout: 5000,
});
