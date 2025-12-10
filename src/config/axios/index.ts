import axios from 'axios';
import ENDPOINTS from './constants/ENDPOINTS.ts';

function getApi() {
  return axios.create({
    baseURL: 'https://14.design.htmlacademy.pro/six-cities',
    timeout: 5000,
  });
}

export { ENDPOINTS, getApi };

export type * from './types.ts';
