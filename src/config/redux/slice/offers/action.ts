import { ENDPOINTS } from '../../../axios';
import { OfferDetails, OfferMeta } from '../../../../components/offer';
import {
  createAppAsyncThunk,
  getErrorTypeByHTTPStatus,
  getRejectValue,
  serializeError,
} from '../../thunk';
import ACTION_NAMES from './constants/ACTION_NAMES';
import { isAxiosError } from 'axios';
import HTTP_STATUS from '../../../axios/constants/HTTP_STATUS';
import ERROR_TYPES from '../../thunk/constants/ERROR_TYPES';
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
  ACTION_NAMES.offers,
  async (_: void, { rejectWithValue, extra: { getApi } }) => {
    try {
      return (await getApi().get<OfferMeta[]>(ENDPOINTS.offers)).data;
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
  ACTION_NAMES.offer,
  async (
    offerID: string | undefined,
    { rejectWithValue, extra: { getApi } }
  ) => {
    try {
      return (
        await getApi().get<OfferDetails>(ENDPOINTS.offer(offerID as string))
      ).data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.status === HTTP_STATUS.notFound
      ) {
        return rejectWithValue({
          type: ERROR_TYPES.notFound,
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
  ACTION_NAMES.nearbyOffers,
  async (
    offerID: string | undefined,
    { rejectWithValue, extra: { getApi } }
  ) => {
    try {
      return (
        await getApi().get<OfferMeta[]>(
          ENDPOINTS.nearbyOffers(offerID as string)
        )
      ).data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.status === HTTP_STATUS.notFound
      ) {
        return rejectWithValue({
          type: ERROR_TYPES.notFound,
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
  ACTION_NAMES.favoriteOffers,
  async (_, { rejectWithValue, extra: { getApi } }) => {
    try {
      return (await getApi().get<OfferMeta[]>(ENDPOINTS.favorite)).data;
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
  ACTION_NAMES.addOfferToFavorites,
  async (offerId, { rejectWithValue, extra: { getApi } }) => {
    try {
      return (
        await getApi().post<OfferMeta>(
          ENDPOINTS.offerFavoriteState({ offerId, isFavorite: true })
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
  ACTION_NAMES.removeOfferToFavorites,
  async (offerId, { rejectWithValue, extra: { getApi } }) => {
    try {
      return (
        await getApi().post<OfferMeta>(
          ENDPOINTS.offerFavoriteState({ offerId, isFavorite: false })
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
