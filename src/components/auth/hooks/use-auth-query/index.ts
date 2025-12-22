import { selectAuthQuery } from '../../../../config/redux/slice/auth/selector';
import { useAppSelector } from '../../../../config/redux';

export function useAuthQuery() {
  return useAppSelector(selectAuthQuery);
}
