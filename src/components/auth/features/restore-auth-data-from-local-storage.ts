import { store } from '../../../config/redux';
import { authSlice } from '../../../config/redux/slice/auth';

export function restoreAuthDataFromLocalStorage() {
  store.dispatch(authSlice.actions.restoreFromLocalStorage());
}
