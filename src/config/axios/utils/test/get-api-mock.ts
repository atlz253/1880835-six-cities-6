import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';

export function getApiMock() {
  return new AxiosMockAdapter(axios);
}
