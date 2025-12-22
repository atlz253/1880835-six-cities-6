import LocalStorageKeys from '../../constants/local-storage';
import { isAuthData } from '../validation';

export function getAuthDataFromLocalStorage() {
  const data = localStorage.getItem(LocalStorageKeys.auth);
  if (data === null) {
    return null;
  }
  try {
    const obj: unknown = JSON.parse(data);
    return isAuthData(obj) ? obj : null;
  } catch (e) {
    return null;
  }
}
