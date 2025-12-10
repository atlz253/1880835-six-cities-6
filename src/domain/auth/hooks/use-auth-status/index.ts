import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../../../../config/redux/slice/auth/selector';

export function useAuthStatus() {
  return useSelector(selectAuthStatus);
}
