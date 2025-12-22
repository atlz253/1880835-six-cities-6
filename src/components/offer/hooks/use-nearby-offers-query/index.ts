import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../config/redux/hooks/use-app-dispatch';
import { nearbyOffersThunk } from '../../../../config/redux/slice/offers';
import { selectNearbyOffers } from '../../../../config/redux/slice/offers/selector';
import { ThunkQuery } from '../../../../config/redux/thunk/types';
import { OfferMeta } from '../../types';
import { State } from '../../../../config/redux';
import { useEffect, useMemo } from 'react';

export function useNearbyOffersQuery({
  offerID,
  limit,
}: {
  offerID?: string;
  limit?: number;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(nearbyOffersThunk(offerID));
  }, [dispatch, offerID]);
  const { data, isError, isFetched, isLoading, error } = useSelector<
    State,
    ThunkQuery<OfferMeta[]>
  >((s) => selectNearbyOffers(s, offerID));
  const limitedOffers = useMemo(
    () => (data ? data.slice(0, limit) : []),
    [data, limit]
  );
  return { data: limitedOffers, isError, isFetched, isLoading, error };
}
