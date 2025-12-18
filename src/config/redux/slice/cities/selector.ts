import { createSelector } from '@reduxjs/toolkit';
import { State } from '../..';
import { selectOffers, selectOffersQuery } from '../offers/selector';

export const selectCitiesState = (s: State) => s.cities;

export const selectCurrentCity = (s: State) => selectCitiesState(s).currentCity;

export const selectUniqueCities = createSelector([selectOffers], (offers) =>
  offers
    .map((o) => o.city)
    .filter((c, i, a) => i === a.findIndex((city) => c.name === city.name))
);

export const selectCitiesQuery = createSelector(
  [selectUniqueCities, selectOffersQuery],
  (data, { isLoading, isError, isFetched, error }) => {
    const isCitiesLoading = isLoading || (!isError && !isFetched);
    return {
      data: isCitiesLoading ? undefined : data,
      isFetched,
      isLoading: isCitiesLoading,
      isError,
      error,
    };
  }
);
