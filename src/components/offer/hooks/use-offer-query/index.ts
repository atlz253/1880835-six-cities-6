import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../config/redux/hooks/use-app-dispatch';
import { offerThunk } from '../../../../config/redux/slice/offers';
import { selectOfferQuery } from '../../../../config/redux/slice/offers/selector';
import { ThunkQuery } from '../../../../config/redux/thunk/types';
import { useEffect } from 'react';
import { OfferDetails } from '../../types';

export function useOfferQuery(offerID?: string): ThunkQuery<OfferDetails> {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(offerThunk(offerID));
  }, [dispatch, offerID]);
  return useSelector((s) => selectOfferQuery(s, offerID));
}
