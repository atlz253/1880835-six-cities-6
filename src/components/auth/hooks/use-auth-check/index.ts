import { useEffect } from 'react';
import { useAppDispatch } from '../../../../config/redux/hooks/use-app-dispatch';
import { checkLoginThunk } from '../../../../config/redux/slice/auth/action';

export function useAuthCheck() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkLoginThunk());
  }, [dispatch]);
}
