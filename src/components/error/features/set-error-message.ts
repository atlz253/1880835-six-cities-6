import { store } from '../../../config/redux';
import { errorSlice } from '../../../config/redux/slice/error';

export function setErrorMessage(message?: string) {
  store.dispatch(errorSlice.actions.setMessage(message));
}
