import { useEffect } from 'react';
import { useAppDispatch } from '../../../../config/redux/hooks/useAppDispatch';
import { favoriteOffersThunk } from '../../../../config/redux/slice/offers';
import { useSelector } from 'react-redux';
import { selectFavoriteOffers } from '../../../../config/redux/slice/offers/selector';

export function useFavoriteOffersQuery() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(favoriteOffersThunk());
  }, [dispatch]);
  return useSelector(selectFavoriteOffers);
}
