import { ApiEndpoints } from '../../../axios';
import { OfferDetails, OfferMeta } from '../../../../components/offer';
import {
  createAppAsyncThunk,
  getErrorTypeByHTTPStatus,
  getRejectValue,
  serializeError,
} from '../../thunk';
import ActionNames from './constants/action-names';
import { isAxiosError } from 'axios';
import HTTPStatuses from '../../../axios/constants/http-statuses';
import ErrorTypes from '../../thunk/constants/error-types';
import { selectAuthStatus } from '../auth/selector';
import {
  selectFavoriteOfferChangeState,
  selectFavoriteOffersState,
} from './selector';
import { OffersSliceState } from './state';
import { AuthSliceState } from '../auth/state';

export const offersThunk = createAppAsyncThunk<
  OfferMeta[],
  void,
  { offers: OffersSliceState }
>(
  ActionNames.offers,
  async (_: void, { rejectWithValue, extra: { getApi } }) => {
    try {
      return (await getApi().get<OfferMeta[]>(ApiEndpoints.offers)).data;
    } catch (error) {
      return rejectWithValue(getRejectValue(error));
    }
  },
  {
    condition: (_: void, { getState }) => {
      const {
        offers: { offers },
      } = getState();
      return offers === undefined;
    },
  }
);

export const offerThunk = createAppAsyncThunk<
  OfferDetails,
  string | undefined,
  { offers: OffersSliceState }
>(
  ActionNames.offer,
  async (
    offerID: string | undefined,
    { rejectWithValue, extra: { getApi } }
  ) => {
    try {
      return (
        await getApi().get<OfferDetails>(ApiEndpoints.offer(offerID as string))
      ).data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.status === HTTPStatuses.notFound
      ) {
        return rejectWithValue({
          type: ErrorTypes.notFound,
          cause: { message: `Offer with ID ${offerID} not found` },
        });
      } else {
        return rejectWithValue(getRejectValue(error));
      }
    }
  },
  {
    condition: (offerID: string | undefined, { getState }) => {
      if (offerID === undefined) {
        return false;
      }
      const {
        offers: { offer },
      } = getState();
      const currentOfferQuery = offer[offerID];
      return currentOfferQuery === undefined;
    },
  }
);

export const nearbyOffersThunk = createAppAsyncThunk<
  OfferMeta[],
  string | undefined,
  { offers: OffersSliceState }
>(
  ActionNames.nearbyOffers,
  async (
    offerID: string | undefined,
    { rejectWithValue, extra: { getApi } }
  ) => {
    try {
      return (
        await getApi().get<OfferMeta[]>(
          ApiEndpoints.nearbyOffers(offerID as string)
        )
      ).data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.status === HTTPStatuses.notFound
      ) {
        return rejectWithValue({
          type: ErrorTypes.notFound,
          cause: {
            message: `Nearby offers not found for offer with ID ${offerID}`,
          },
        });
      } else {
        return rejectWithValue(getRejectValue(error));
      }
    }
  },
  {
    condition: (offerID: string | undefined, { getState }) => {
      if (offerID === undefined) {
        return false;
      }
      const {
        offers: { nearbyOffers },
      } = getState();
      const currentNearbyOffers = nearbyOffers[offerID];
      return currentNearbyOffers === undefined;
    },
  }
);

export const favoriteOffersThunk = createAppAsyncThunk<
  OfferMeta[],
  void,
  { offers: OffersSliceState; auth: AuthSliceState }
>(
  ActionNames.favoriteOffers,
  async (_, { rejectWithValue, extra: { getApi } }) => {
    try {
      return (await getApi().get<OfferMeta[]>(ApiEndpoints.favorite)).data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue({
          type: getErrorTypeByHTTPStatus(error.response.status),
          cause: serializeError(error),
        });
      } else {
        return rejectWithValue(getRejectValue(error));
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const authStatus = selectAuthStatus(state);
      const favoriteOfferState = selectFavoriteOffersState(state);
      return authStatus && favoriteOfferState === undefined;
    },
  }
);

export const addOfferToFavoritesThunk = createAppAsyncThunk<
  OfferMeta,
  string,
  { offers: OffersSliceState }
>(
  ActionNames.addOfferToFavorites,
  async (offerId, { rejectWithValue, extra: { getApi } }) => {
    try {
      return (
        await getApi().post<OfferMeta>(
          ApiEndpoints.offerFavoriteState({ offerId, isFavorite: true })
        )
      ).data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue({
          type: getErrorTypeByHTTPStatus(error.response.status),
          cause: serializeError(error),
        });
      } else {
        return rejectWithValue(getRejectValue(error));
      }
    }
  },
  {
    condition: (offerId, { getState }) => {
      const favoriteOffersChangeState = selectFavoriteOfferChangeState(
        getState()
      );
      return (
        favoriteOffersChangeState[offerId] === undefined ||
        !favoriteOffersChangeState[offerId]?.isLoading
      );
    },
  }
);

export const removeOfferFromFavoritesThunk = createAppAsyncThunk<
  OfferMeta,
  string,
  { offers: OffersSliceState }
>(
  ActionNames.removeOfferToFavorites,
  async (offerId, { rejectWithValue, extra: { getApi } }) => {
    try {
      return (
        await getApi().post<OfferMeta>(
          ApiEndpoints.offerFavoriteState({ offerId, isFavorite: false })
        )
      ).data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue({
          type: getErrorTypeByHTTPStatus(error.response.status),
          cause: serializeError(error),
        });
      } else {
        return rejectWithValue(getRejectValue(error));
      }
    }
  },
  {
    condition: (offerId, { getState }) => {
      const favoriteOffersChangeState = selectFavoriteOfferChangeState(
        getState()
      );
      return (
        favoriteOffersChangeState[offerId] === undefined ||
        !favoriteOffersChangeState[offerId]?.isLoading
      );
    },
  }
);
