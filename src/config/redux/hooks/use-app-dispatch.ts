import { useDispatch } from 'react-redux';
import { AppDispatch } from '..';

export function useAppDispatch(
  ...args: Parameters<typeof useDispatch<AppDispatch>>
) {
  return useDispatch<AppDispatch>(...args);
}
