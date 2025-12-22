import { store } from '../../../config/redux';
import { signOutThunk } from '../../../config/redux/slice/auth/action';

export function signOut() {
  store.dispatch(signOutThunk());
}
