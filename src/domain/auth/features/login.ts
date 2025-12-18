import { store } from '../../../config/redux';
import { loginThunk } from '../../../config/redux/slice/auth/action';
import { Credentials } from '../types';

export function login(credentials: Credentials) {
  store.dispatch(loginThunk(credentials));
}
