import { useSelector } from 'react-redux';
import { selectOffersQuery } from '../../../../config/redux/slice/offers/selector';
import { offersThunk } from '../../../../config/redux/slice/offers';
import { useAppDispatch } from '../../../../config/redux/hooks/use-app-dispatch';
import { useEffect } from 'react';

export function useOffersQuery() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(offersThunk());
  }, [dispatch]);
  return useSelector(selectOffersQuery);
}
