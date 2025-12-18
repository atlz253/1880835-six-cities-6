import { useSelector } from 'react-redux';
import { selectAuthQuery } from '../../../../config/redux/slice/auth/selector';

export function useAuthQuery() {
  return useSelector(selectAuthQuery);
}
