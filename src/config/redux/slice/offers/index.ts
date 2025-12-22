import { createSlice } from '@reduxjs/toolkit';
import SliceNames from '../../constants/slice-names';
import {
  addOfferToFavoritesThunk,
  favoriteOffersThunk,
  nearbyOffersThunk,
  offerThunk,
  offersThunk,
  removeOfferFromFavoritesThunk,
} from './action';
import { getEmptyState } from './state';
import {
  getFulfilledState,
  getPendingState,
  getRejectedState,
} from '../../thunk';

export const offersSlice = createSlice({
  name: SliceNames.offers,
  initialState: getEmptyState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(offersThunk.pending, (s) => {
        s.offers = getPendingState();
      })
      .addCase(offersThunk.fulfilled, (s, a) => {
        s.offers = getFulfilledState(a.payload);
      })
      .addCase(offersThunk.rejected, (s, a) => {
        s.offers = getRejectedState(a.payload);
      })
      .addCase(offerThunk.pending, (s, a) => {
        s.offer[a.meta.arg as string] = getPendingState();
      })
      .addCase(offerThunk.fulfilled, (s, a) => {
        s.offer[a.meta.arg as string] = getFulfilledState(a.payload);
      })
      .addCase(offerThunk.rejected, (s, a) => {
        s.offer[a.meta.arg as string] = getRejectedState(a.payload);
      })
      .addCase(nearbyOffersThunk.pending, (s, a) => {
        s.nearbyOffers[a.meta.arg as string] = getPendingState();
      })
      .addCase(nearbyOffersThunk.fulfilled, (s, a) => {
        s.nearbyOffers[a.meta.arg as string] = getFulfilledState(a.payload);
      })
      .addCase(nearbyOffersThunk.rejected, (s, a) => {
        s.nearbyOffers[a.meta.arg as string] = getRejectedState(a.payload);
      })
      .addCase(favoriteOffersThunk.pending, (s) => {
        s.favoriteOffers = getPendingState();
      })
      .addCase(favoriteOffersThunk.fulfilled, (s, a) => {
        s.favoriteOffers = getFulfilledState(a.payload);
      })
      .addCase(favoriteOffersThunk.rejected, (s, a) => {
        s.favoriteOffers = getRejectedState(a.payload);
      })
      .addCase(addOfferToFavoritesThunk.pending, (s, a) => {
        s.favoriteOfferChangeState[a.meta.arg] = getPendingState();
      })
      .addCase(addOfferToFavoritesThunk.fulfilled, (s, a) => {
        const offer = a.payload;
        const detailedOffer = s.offer[offer.id];
        s.favoriteOfferChangeState[a.meta.arg] = getFulfilledState(offer);
        if (s.favoriteOffers?.data) {
          s.favoriteOffers.data = [...s.favoriteOffers.data, offer];
        }
        if (s.offers?.data) {
          const meta = s.offers.data.find((o) => o.id === offer.id);
          if (meta) {
            meta.isFavorite = true;
          }
        }
        if (detailedOffer && detailedOffer.data) {
          detailedOffer.data.isFavorite = true;
        }
        for (const nearbyOffers of Object.values(s.nearbyOffers)) {
          nearbyOffers?.data?.forEach((o) =>
            o.id === offer.id ? (o.isFavorite = true) : null
          );
        }
      })
      .addCase(addOfferToFavoritesThunk.rejected, (s, a) => {
        s.favoriteOfferChangeState[a.meta.arg] = getRejectedState(a.payload);
      })
      .addCase(removeOfferFromFavoritesThunk.pending, (s, a) => {
        s.favoriteOfferChangeState[a.meta.arg] = getPendingState();
      })
      .addCase(removeOfferFromFavoritesThunk.fulfilled, (s, a) => {
        const offer = a.payload;
        const detailedOffer = s.offer[offer.id];
        s.favoriteOfferChangeState[a.meta.arg] = getFulfilledState(offer);
        if (s.favoriteOffers?.data) {
          s.favoriteOffers.data = s.favoriteOffers.data.filter(
            (o) => o.id !== offer.id
          );
        }
        if (s.offers?.data) {
          const meta = s.offers.data.find((o) => o.id === offer.id);
          if (meta) {
            meta.isFavorite = false;
          }
        }
        if (detailedOffer && detailedOffer.data) {
          detailedOffer.data.isFavorite = false;
        }
        for (const nearbyOffers of Object.values(s.nearbyOffers)) {
          nearbyOffers?.data?.forEach((o) =>
            o.id === offer.id ? (o.isFavorite = false) : null
          );
        }
      })
      .addCase(removeOfferFromFavoritesThunk.rejected, (s, a) => {
        s.favoriteOfferChangeState[a.meta.arg] = getRejectedState(a.payload);
      }),
});

export * from './action';
