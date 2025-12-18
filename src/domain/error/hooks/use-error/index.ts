import { useSelector } from 'react-redux';
import { selectErrorState } from '../../../../config/redux/slice/error/selector';

export function useError() {
  return useSelector(selectErrorState);
}
