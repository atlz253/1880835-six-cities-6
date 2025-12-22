import axios from 'axios';
import ApiEndpoints from './constants/api-endpoints.ts';
import { addTokenInterceptor } from '../redux/utils/axios/addTokenInterceptor.ts';
import { addAlertNetworkErrorInterceptor } from './interceptors/add-alert-network-error-interceptor.ts';

function getApi() {
  const result = axios.create({
    baseURL: 'https://14.design.htmlacademy.pro/six-cities',
    timeout: 5000,
  });

  addTokenInterceptor(result);
  addAlertNetworkErrorInterceptor(result);

  return result;
}

export { ApiEndpoints, getApi };

export type * from './types.ts';
