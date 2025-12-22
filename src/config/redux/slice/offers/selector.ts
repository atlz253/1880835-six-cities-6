import { createSelector } from '@reduxjs/toolkit';
import { State } from '../..';
import { OfferDetails, OfferMeta } from '../../../../components/offer';
import { getEmptyQueryState, ThunkQuery } from '../../thunk';
import { OffersSliceState } from './state';

export const selectOffersState = (s: { offers: OffersSliceState }) => s.offers;

export const selectOffersQuery = createSelector(
  [selectOffersState],
  (offers) => offers.offers ?? getEmptyQueryState<OfferMeta[]>()
);

export const selectOffers = createSelector(
  [selectOffersQuery],
  ({ data }) => data ?? []
);

export const selectOfferState = (s: State) => selectOffersState(s).offer;

export const selectOfferQuery = createSelector(
  [selectOfferState, (_state, offerID: string | undefined) => offerID],
  (offerState, offerID) =>
    offerID && offerState[offerID]
      ? (offerState[offerID] as ThunkQuery<OfferDetails>)
      : getEmptyQueryState<OfferDetails>()
);

export const selectNearbyOffersState = (s: State) =>
  selectOffersState(s).nearbyOffers;

export const selectNearbyOffers = createSelector(
  [selectNearbyOffersState, (_state, offerID: string | undefined) => offerID],
  (nearbyOffersState, offerID) =>
    offerID && nearbyOffersState[offerID]
      ? (nearbyOffersState[offerID] as ThunkQuery<OfferMeta[]>)
      : getEmptyQueryState<OfferMeta[]>()
);

export const selectFavoriteOffersState = (s: { offers: OffersSliceState }) =>
  selectOffersState(s).favoriteOffers;

export const selectFavoriteOffers = createSelector(
  [selectFavoriteOffersState],
  (favoriteOffers) =>
    favoriteOffers ? favoriteOffers : getEmptyQueryState<OfferMeta[]>()
);

export const selectFavoriteOfferChangeState = (s: {
  offers: OffersSliceState;
}) => s.offers.favoriteOfferChangeState;
