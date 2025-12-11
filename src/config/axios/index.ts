import axios from 'axios';
import ENDPOINTS from './constants/ENDPOINTS.ts';
import { addTokenInterceptor } from '../redux/utils/axios/addTokenInterceptor.ts';

function getApi() {
  const result = axios.create({
    baseURL: 'https://14.design.htmlacademy.pro/six-cities',
    timeout: 5000,
  });

  addTokenInterceptor(result);

  return result;
}

export { ENDPOINTS, getApi };

export type * from './types.ts';
