import { AxiosError, AxiosInstance } from 'axios';

export function addAlertNetworkErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (
        !error.response ||
        error.code === 'ERR_NETWORK' ||
        error.code === 'ECONNABORTED'
      ) {
        // eslint-disable-next-line no-alert
        alert(
          'Сервер недоступен. Проверьте интернет-соединение или попробуйте позже.'
        );
      }
      return Promise.reject(error);
    }
  );
}
