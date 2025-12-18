import { useSelector } from 'react-redux';
import { selectCitiesQuery } from '../../../../config/redux/slice/cities/selector';
import { useAppDispatch } from '../../../../config/redux/hooks/useAppDispatch';
import { useEffect } from 'react';
import { offersThunk } from '../../../../config/redux/slice/offers';

export function useCitiesQuery() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(offersThunk());
  }, [dispatch]);
  return useSelector(selectCitiesQuery);
}
