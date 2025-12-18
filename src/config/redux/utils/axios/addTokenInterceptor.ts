import { AxiosInstance } from 'axios';
import { selectAuthToken } from '../../slice/auth/selector';
import { AppStore } from '../..';

let scopedStore: AppStore | undefined;

export function configureTokenInterceptor(s: AppStore) {
  scopedStore = s;
}

export function addTokenInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const token = scopedStore
      ? selectAuthToken(scopedStore.getState())
      : undefined;
    if (token !== undefined) {
      config.headers['X-Token'] = token;
    }
    return config;
  });
}
