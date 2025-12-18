import { useSelector } from 'react-redux';
import { selectCurrentCity } from '../../../../config/redux/slice/cities/selector';

export function useCurrentCity() {
  return useSelector(selectCurrentCity);
}
